/**
 * Checks every rule of the Reading List API contract (see README.md).
 *
 *   npm run check
 *     Starts the server itself on port 3101, runs all checks, stops the
 *     server, starts it a second time and checks that the data survived the
 *     restart. Uses MONGODB_URI from .env (or from the environment).
 *
 *   BASE_URL=http://localhost:3001 npm run check
 *     Checks a server that is already running. Skips the restart check.
 *
 * The checks create their own books (title prefix "check-api") and delete
 * them again. They do not depend on the seed data.
 */
import { spawn, type ChildProcess } from "node:child_process";

const KEYS = ["author", "id", "notes", "rating", "status", "title"];
const PREFIX = "check-api";
const externalUrl = process.env.BASE_URL?.replace(/\/$/, "");
const port = Number(process.env.CHECK_PORT) || 3101;
const base = externalUrl ?? `http://localhost:${port}`;

let passed = 0;
const failures: string[] = [];

async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
    passed++;
    console.log(`  PASS  ${name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${name}: ${message}`);
    console.log(`  FAIL  ${name}\n        ${message}`);
  }
}

function expect(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

type Reply = { status: number; body: any; raw: string; type: string };

async function call(
  method: string,
  path: string,
  body?: unknown,
  rawBody?: string
): Promise<Reply> {
  const init: RequestInit = { method };
  if (rawBody !== undefined || body !== undefined) {
    init.headers = { "Content-Type": "application/json" };
    init.body = rawBody ?? JSON.stringify(body);
  }
  const response = await fetch(base + path, init);
  const raw = await response.text();
  let parsed: unknown;
  try {
    parsed = raw === "" ? undefined : JSON.parse(raw);
  } catch {
    parsed = undefined;
  }
  return {
    status: response.status,
    body: parsed,
    raw,
    type: response.headers.get("content-type") ?? "",
  };
}

function expectStatus(reply: Reply, status: number) {
  expect(
    reply.status === status,
    `expected status ${status}, got ${reply.status} (${reply.raw.slice(0, 120)})`
  );
}

function expectError(reply: Reply, status: number, message?: string) {
  expectStatus(reply, status);
  expect(
    reply.type.includes("application/json"),
    `error response must be JSON, got "${reply.type}"`
  );
  expect(
    typeof reply.body?.error === "string" && reply.body.error !== "",
    'error response needs a non-empty string "error"'
  );
  if (message)
    expect(
      reply.body.error === message,
      `expected error "${message}", got "${reply.body.error}"`
    );
}

function expectBook(book: any) {
  expect(typeof book === "object" && book !== null, "expected a book object");
  expect(
    JSON.stringify(Object.keys(book).sort()) === JSON.stringify(KEYS),
    `book must have exactly the keys ${KEYS.join(", ")}, got ${Object.keys(book).sort().join(", ")}`
  );
  expect(
    typeof book.id === "string" && book.id !== "",
    "id must be a non-empty string"
  );
  expect(typeof book.title === "string", "title must be a string");
  expect(typeof book.author === "string", "author must be a string");
  expect(
    ["want-to-read", "reading", "done"].includes(book.status),
    "status must be one of the three values"
  );
  expect(
    book.rating === null ||
      (Number.isInteger(book.rating) && book.rating >= 1 && book.rating <= 5),
    "rating must be null or an integer 1 to 5"
  );
  expect(typeof book.notes === "string", "notes must be a string");
}

const unique = `${PREFIX}-${Date.now().toString(36)}`;
const createdIds: string[] = [];

async function createBook(fields: Record<string, unknown>) {
  const reply = await call("POST", "/api/books", {
    author: "Check Author",
    ...fields,
  });
  expectStatus(reply, 201);
  createdIds.push(reply.body.id);
  return reply.body;
}

async function cleanup() {
  for (const id of createdIds)
    await call("DELETE", `/api/books/${id}`).catch(() => undefined);
}

async function runContractChecks() {
  console.log("\nHealth and unknown routes");
  await check("GET /api/health -> 200 { status: ok }", async () => {
    const reply = await call("GET", "/api/health");
    expectStatus(reply, 200);
    expect(reply.body?.status === "ok", 'body must be { "status": "ok" }');
  });
  await check("unknown GET route -> 404 { error: Not found }", async () => {
    expectError(await call("GET", "/api/nope"), 404, "Not found");
  });
  await check(
    "unknown route with POST -> 404 { error: Not found }",
    async () => {
      expectError(await call("POST", "/nope", {}), 404, "Not found");
    }
  );
  await check("invalid JSON body -> 400 { error }", async () => {
    expectError(
      await call("POST", "/api/books", undefined, '{"title": "broken'),
      400
    );
  });

  console.log("\nPOST /api/books");
  let minimal: any;
  await check(
    "minimal body -> 201 with defaults (want-to-read, null, empty notes)",
    async () => {
      minimal = await createBook({ title: `${unique} minimal` });
      expectBook(minimal);
      expect(
        minimal.status === "want-to-read",
        `default status must be want-to-read, got ${minimal.status}`
      );
      expect(minimal.rating === null, "default rating must be null");
      expect(minimal.notes === "", 'default notes must be ""');
    }
  );
  await check("full body -> 201 and the values are returned", async () => {
    const book = await createBook({
      title: `${unique} full`,
      status: "done",
      rating: 4,
      notes: "Great",
    });
    expectBook(book);
    expect(
      book.status === "done" && book.rating === 4 && book.notes === "Great",
      "values must be stored as sent"
    );
  });
  await check("response has id, no _id and no __v", async () => {
    const book = await createBook({ title: `${unique} keys`, rating: null });
    expect(
      !("_id" in book) && !("__v" in book),
      "_id and __v must not be in the response"
    );
    expect(typeof book.id === "string", "id must be a string");
  });
  const badBodies: [string, Record<string, unknown>][] = [
    ["missing title", { author: "A" }],
    ["empty title", { title: "", author: "A" }],
    ["title with spaces only", { title: "   ", author: "A" }],
    ["title is not a string", { title: 42, author: "A" }],
    ["missing author", { title: "T" }],
    ["empty author", { title: "T", author: "" }],
    ["unknown status", { title: "T", author: "A", status: "finished" }],
    ["rating 0", { title: "T", author: "A", rating: 0 }],
    ["rating 6", { title: "T", author: "A", rating: 6 }],
    ["rating 3.5", { title: "T", author: "A", rating: 3.5 }],
    ['rating "3" (string)', { title: "T", author: "A", rating: "3" }],
    ["notes is not a string", { title: "T", author: "A", notes: 7 }],
  ];
  for (const [name, body] of badBodies) {
    await check(`400 for ${name}`, async () =>
      expectError(await call("POST", "/api/books", body), 400)
    );
  }
  await check("400 for a body that is not an object", async () => {
    expectError(await call("POST", "/api/books", ["not", "an", "object"]), 400);
  });
  await check("400 for a missing body", async () => {
    expectError(await call("POST", "/api/books"), 400);
  });
  await check("rating null and rating 1 and 5 are accepted", async () => {
    for (const rating of [null, 1, 5]) {
      const book = await createBook({ title: `${unique} rating`, rating });
      expect(book.rating === rating, `rating ${rating} must be stored`);
    }
  });

  console.log("\nGET /api/books");
  await createBook({ title: `${unique} Alpha Dune`, status: "reading" });
  await createBook({ title: `${unique} Beta`, status: "done" });
  await check(
    "list -> 200 array of books that contains the created book",
    async () => {
      const reply = await call("GET", "/api/books");
      expectStatus(reply, 200);
      expect(Array.isArray(reply.body), "body must be an array");
      reply.body.forEach(expectBook);
      expect(
        reply.body.some((book: any) => book.id === minimal.id),
        "the created book must be in the list"
      );
    }
  );
  await check("?status= filters by status", async () => {
    const reply = await call("GET", "/api/books?status=reading");
    expectStatus(reply, 200);
    expect(
      reply.body.length > 0 &&
        reply.body.every((b: any) => b.status === "reading"),
      "only reading books expected"
    );
    expect(
      reply.body.some((b: any) => b.title === `${unique} Alpha Dune`),
      "the reading book must be found"
    );
  });
  await check(
    "?q= matches the title, case-insensitive and trimmed",
    async () => {
      const reply = await call(
        "GET",
        `/api/books?q=${encodeURIComponent("  " + unique.toUpperCase() + " ALPHA ")}`
      );
      expectStatus(reply, 200);
      expect(
        reply.body.length === 1 &&
          reply.body[0].title === `${unique} Alpha Dune`,
        `expected exactly the Alpha book, got ${reply.body.length} books`
      );
    }
  );
  await check("?q= matches only the title, not the author", async () => {
    const reply = await call("GET", "/api/books?q=Check%20Author");
    expectStatus(reply, 200);
    expect(reply.body.length === 0, "q must not match the author");
  });
  await check("?status= and ?q= can be combined", async () => {
    const hit = await call("GET", `/api/books?status=done&q=${unique}%20beta`);
    expect(
      hit.body.length === 1 && hit.body[0].title === `${unique} Beta`,
      "expected the Beta book"
    );
    const miss = await call(
      "GET",
      `/api/books?status=reading&q=${unique}%20beta`
    );
    expect(miss.body.length === 0, "expected no book");
  });
  await check(
    "?q= with regex characters is treated as plain text",
    async () => {
      const reply = await call(
        "GET",
        "/api/books?q=" + encodeURIComponent(".*")
      );
      expectStatus(reply, 200);
      expect(
        reply.body.every((b: any) => b.title.toLowerCase().includes(".*")),
        '"." and "*" must not act as a pattern'
      );
    }
  );
  await check("?q= with no match -> 200 []", async () => {
    const reply = await call("GET", `/api/books?q=${unique}-no-such-title`);
    expectStatus(reply, 200);
    expect(
      Array.isArray(reply.body) && reply.body.length === 0,
      "expected an empty array"
    );
  });

  console.log("\nGET /api/books/:id");
  await check("existing id -> 200 book", async () => {
    const reply = await call("GET", `/api/books/${minimal.id}`);
    expectStatus(reply, 200);
    expectBook(reply.body);
    expect(reply.body.id === minimal.id, "id must match");
  });
  await check(
    "unknown id (valid ObjectId format) -> 404 Book not found",
    async () => {
      expectError(
        await call("GET", "/api/books/000000000000000000000000"),
        404,
        "Book not found"
      );
    }
  );
  await check(
    "invalid id (not an ObjectId) -> 404 Book not found, no 500",
    async () => {
      expectError(
        await call("GET", "/api/books/not-an-id"),
        404,
        "Book not found"
      );
    }
  );

  console.log("\nPUT /api/books/:id");
  const target = await createBook({
    title: `${unique} put`,
    status: "reading",
    rating: 3,
    notes: "old",
  });
  await check("valid body -> 200 and the book is replaced", async () => {
    const reply = await call("PUT", `/api/books/${target.id}`, {
      title: `${unique} put 2`,
      author: "New Author",
      status: "done",
      rating: 5,
      notes: "new",
    });
    expectStatus(reply, 200);
    expectBook(reply.body);
    expect(reply.body.id === target.id, "id must not change");
    expect(
      reply.body.title === `${unique} put 2` &&
        reply.body.author === "New Author" &&
        reply.body.status === "done" &&
        reply.body.rating === 5 &&
        reply.body.notes === "new",
      "fields must be replaced"
    );
    const again = await call("GET", `/api/books/${target.id}`);
    expect(
      again.body.title === `${unique} put 2` && again.body.notes === "new",
      "the change must be stored"
    );
  });
  await check(
    "PUT replaces: missing optional fields fall back to the defaults",
    async () => {
      const reply = await call("PUT", `/api/books/${target.id}`, {
        title: `${unique} put 3`,
        author: "A",
      });
      expectStatus(reply, 200);
      expect(
        reply.body.status === "want-to-read" &&
          reply.body.rating === null &&
          reply.body.notes === "",
        "status, rating and notes must be reset to the defaults"
      );
    }
  );
  for (const [name, body] of [
    ["empty title", { title: "", author: "A" }],
    ["missing author", { title: "T" }],
    ["unknown status", { title: "T", author: "A", status: "nope" }],
    ["rating 7", { title: "T", author: "A", rating: 7 }],
  ] as [string, Record<string, unknown>][]) {
    await check(`PUT 400 for ${name}`, async () =>
      expectError(await call("PUT", `/api/books/${target.id}`, body), 400)
    );
  }
  await check("a failed PUT does not change the book", async () => {
    const reply = await call("GET", `/api/books/${target.id}`);
    expect(
      reply.body.title === `${unique} put 3`,
      "the book must stay as before"
    );
  });
  await check("PUT unknown id -> 404 Book not found", async () => {
    expectError(
      await call("PUT", "/api/books/000000000000000000000000", {
        title: "T",
        author: "A",
      }),
      404,
      "Book not found"
    );
  });
  await check("PUT invalid id -> 404 Book not found, no 500", async () => {
    expectError(
      await call("PUT", "/api/books/not-an-id", { title: "T", author: "A" }),
      404,
      "Book not found"
    );
  });

  console.log("\nDELETE /api/books/:id");
  const doomed = await createBook({ title: `${unique} delete` });
  await check("existing id -> 204 without a body", async () => {
    const reply = await call("DELETE", `/api/books/${doomed.id}`);
    expectStatus(reply, 204);
    expect(reply.raw === "", "204 must have no body");
  });
  await check("the deleted book is gone (GET -> 404)", async () => {
    expectError(
      await call("GET", `/api/books/${doomed.id}`),
      404,
      "Book not found"
    );
  });
  await check("DELETE again -> 404 Book not found", async () => {
    expectError(
      await call("DELETE", `/api/books/${doomed.id}`),
      404,
      "Book not found"
    );
  });
  await check("DELETE invalid id -> 404 Book not found, no 500", async () => {
    expectError(
      await call("DELETE", "/api/books/not-an-id"),
      404,
      "Book not found"
    );
  });
}

// --- Starting the server for the restart check ---------------------------------

let server: ChildProcess | undefined;
let serverLog = "";

function startServer() {
  serverLog = "";
  server = spawn(
    "node_modules/.bin/tsx",
    ["--env-file-if-exists=.env", "src/index.ts"],
    {
      env: { ...process.env, PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"],
    }
  );
  server.stdout?.on("data", (chunk) => (serverLog += chunk));
  server.stderr?.on("data", (chunk) => (serverLog += chunk));
}

async function stopServer() {
  const current = server;
  if (!current || current.exitCode !== null) return;
  await new Promise<void>((resolve) => {
    current.once("exit", () => resolve());
    current.kill("SIGTERM");
  });
}

async function waitForServer() {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (server && server.exitCode !== null) {
      throw new Error(
        `The server stopped on start (exit code ${server.exitCode}):\n${serverLog.trim()}`
      );
    }
    try {
      const response = await fetch(`${base}/api/health`);
      if (response.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(
    `The server did not answer within 20 seconds:\n${serverLog.trim()}`
  );
}

async function main() {
  console.log(`Checking the API at ${base}`);
  if (!externalUrl) {
    startServer();
    await waitForServer();
  }
  let persistedBook: any;
  try {
    await runContractChecks();
    if (!externalUrl) {
      persistedBook = await createBook({
        title: `${unique} persistence`,
        notes: "survives a restart",
      });
    }
  } finally {
    if (externalUrl) await cleanup().catch(() => undefined);
  }

  if (!externalUrl) {
    console.log("\nPersistence");
    await stopServer();
    startServer();
    await waitForServer();
    await check(
      "a book created before a restart is still there after the restart",
      async () => {
        const reply = await call("GET", `/api/books/${persistedBook.id}`);
        expect(
          reply.status === 200 && reply.body?.notes === "survives a restart",
          `expected the book to survive the restart, got status ${reply.status}. Is the data stored in MongoDB?`
        );
      }
    );
    await cleanup();
    await stopServer();
  }

  console.log(`\n${passed} passed, ${failures.length} failed`);
  if (failures.length > 0) {
    console.log("\nFailed checks:");
    failures.forEach((failure) => console.log(`  - ${failure}`));
    process.exitCode = 1;
  }
}

main().catch(async (error) => {
  console.error(error instanceof Error ? error.message : error);
  await stopServer();
  process.exitCode = 1;
});
