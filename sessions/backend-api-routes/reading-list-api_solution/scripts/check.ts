/**
 * Runs requests against a running server and checks every rule of the API contract.
 *
 *   npm run dev      (in one terminal)
 *   npm run check    (in another terminal)
 *   BASE_URL=http://localhost:4000 npm run check   (another server address)
 *
 * It creates its own books (title starts with "check-api") and deletes them at the end.
 * It does not depend on the seed data.
 */
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL ?? "http://localhost:3001").replace(
  /\/$/,
  ""
);
const FIELDS = ["author", "id", "notes", "rating", "status", "title"];

type Reply = { status: number; contentType: string; text: string; json: any };

async function call(
  method: string,
  path: string,
  body?: unknown,
  rawBody?: string
): Promise<Reply> {
  const response = await fetch(BASE + path, {
    method,
    headers:
      body !== undefined || rawBody !== undefined
        ? { "Content-Type": "application/json" }
        : undefined,
    body: rawBody ?? (body !== undefined ? JSON.stringify(body) : undefined),
  });
  const text = await response.text();
  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    json = undefined;
  }
  return {
    status: response.status,
    contentType: response.headers.get("content-type") ?? "",
    text,
    json,
  };
}

function expectStatus(reply: Reply, status: number) {
  assert.equal(
    reply.status,
    status,
    `expected status ${status}, got ${reply.status}`
  );
}

function expectError(reply: Reply, status: number, message?: string) {
  expectStatus(reply, status);
  assert.match(
    reply.contentType,
    /application\/json/,
    "the error response must be JSON"
  );
  assert.deepEqual(
    Object.keys(reply.json ?? {}),
    ["error"],
    "the body must be { error: <message> }"
  );
  assert.equal(typeof reply.json.error, "string");
  assert.ok(reply.json.error.length > 0, "the error message must not be empty");
  if (message !== undefined) {
    assert.equal(reply.json.error, message);
  }
}

function expectBook(book: any) {
  assert.ok(book && typeof book === "object", "expected a book object");
  assert.deepEqual(
    Object.keys(book).sort(),
    FIELDS,
    "a book has exactly: id, title, author, status, rating, notes"
  );
  assert.equal(typeof book.id, "string", "id must be a string");
  assert.ok(book.id.length > 0);
}

const unique = Math.random().toString(36).slice(2, 8);
const created: string[] = [];

async function createBook(extra: Record<string, unknown> = {}) {
  const reply = await call("POST", "/api/books", {
    title: `check-api ${unique}`,
    author: "Check Author",
    ...extra,
  });
  assert.equal(
    reply.status,
    201,
    `setup failed: POST returned ${reply.status}`
  );
  created.push(reply.json.id);
  return reply.json;
}

const rules: [string, () => Promise<void>][] = [];
const rule = (name: string, run: () => Promise<void>) =>
  rules.push([name, run]);

// Health and unknown routes
rule("GET /api/health returns 200 { status: 'ok' }", async () => {
  const reply = await call("GET", "/api/health");
  expectStatus(reply, 200);
  assert.deepEqual(reply.json, { status: "ok" });
});
rule(
  "unknown route GET /api/nope returns 404 { error: 'Not found' }",
  async () => {
    expectError(await call("GET", "/api/nope"), 404, "Not found");
  }
);
rule(
  "unknown route outside /api returns 404 { error: 'Not found' }",
  async () => {
    expectError(await call("GET", "/nope"), 404, "Not found");
  }
);
rule(
  "unknown method on a known path returns 404 { error: 'Not found' }",
  async () => {
    expectError(await call("PATCH", "/api/books"), 404, "Not found");
  }
);

// Read
rule(
  "GET /api/books/count returns 200 and { count: <number of books> } (from Backend Basics)",
  async () => {
    const before = (await call("GET", "/api/books")).json.length;
    const reply = await call("GET", "/api/books/count");
    expectStatus(reply, 200);
    assert.deepEqual(reply.json, { count: before });
  }
);
rule("GET /api/books returns 200 and an array of books", async () => {
  const reply = await call("GET", "/api/books");
  expectStatus(reply, 200);
  assert.match(reply.contentType, /application\/json/);
  assert.ok(Array.isArray(reply.json));
  reply.json.forEach(expectBook);
});
rule("GET /api/books/:id returns 200 and the book", async () => {
  const book = await createBook();
  const reply = await call("GET", `/api/books/${book.id}`);
  expectStatus(reply, 200);
  assert.deepEqual(reply.json, book);
});
rule(
  "GET /api/books/:id with an unknown id returns 404 { error: 'Book not found' }",
  async () => {
    expectError(
      await call("GET", "/api/books/does-not-exist"),
      404,
      "Book not found"
    );
  }
);

// Create
rule(
  "POST /api/books with all fields returns 201 and the book with a new id",
  async () => {
    const reply = await call("POST", "/api/books", {
      title: `check-api ${unique} full`,
      author: "Check Author",
      status: "reading",
      rating: 4,
      notes: "a note",
    });
    expectStatus(reply, 201);
    expectBook(reply.json);
    created.push(reply.json.id);
    assert.equal(reply.json.title, `check-api ${unique} full`);
    assert.equal(reply.json.status, "reading");
    assert.equal(reply.json.rating, 4);
    assert.equal(reply.json.notes, "a note");
  }
);
rule(
  "POST /api/books with title and author sets the defaults (want-to-read, null, '')",
  async () => {
    const reply = await call("POST", "/api/books", {
      title: `check-api ${unique} min`,
      author: "Check Author",
    });
    expectStatus(reply, 201);
    expectBook(reply.json);
    created.push(reply.json.id);
    assert.equal(reply.json.status, "want-to-read");
    assert.equal(reply.json.rating, null);
    assert.equal(reply.json.notes, "");
  }
);
rule("POST /api/books with rating null returns 201", async () => {
  const reply = await call("POST", "/api/books", {
    title: `check-api ${unique}`,
    author: "A",
    rating: null,
  });
  expectStatus(reply, 201);
  created.push(reply.json.id);
  assert.equal(reply.json.rating, null);
});
rule("a created book can be read again with GET /api/books/:id", async () => {
  const book = await createBook({ rating: 3 });
  assert.deepEqual((await call("GET", `/api/books/${book.id}`)).json, book);
});
rule("two created books get different ids", async () => {
  const a = await createBook();
  const b = await createBook();
  assert.notEqual(a.id, b.id);
});

const invalidBodies: [string, Record<string, unknown>][] = [
  ["missing title", { author: "A" }],
  ["empty title", { title: "", author: "A" }],
  ["title with spaces only", { title: "   ", author: "A" }],
  ["missing author", { title: "T" }],
  ["empty author", { title: "T", author: "" }],
  ["status not allowed", { title: "T", author: "A", status: "finished" }],
  ["rating 0", { title: "T", author: "A", rating: 0 }],
  ["rating 6", { title: "T", author: "A", rating: 6 }],
  ["rating 3.5", { title: "T", author: "A", rating: 3.5 }],
  ["rating as text '4'", { title: "T", author: "A", rating: "4" }],
];
for (const [name, body] of invalidBodies) {
  rule(`POST /api/books with ${name} returns 400 { error }`, async () => {
    expectError(await call("POST", "/api/books", body), 400);
  });
}
rule("POST /api/books with invalid JSON returns 400 { error }", async () => {
  expectError(
    await call("POST", "/api/books", undefined, '{"title": "oops'),
    400
  );
});
rule("an invalid POST does not create a book", async () => {
  const before = (await call("GET", "/api/books")).json.length;
  await call("POST", "/api/books", { title: "", author: "A" });
  assert.equal((await call("GET", "/api/books")).json.length, before);
});

// Update
rule(
  "PUT /api/books/:id returns 200 and the replaced book, the id stays the same",
  async () => {
    const book = await createBook();
    const reply = await call("PUT", `/api/books/${book.id}`, {
      title: `check-api ${unique} changed`,
      author: "New Author",
      status: "done",
      rating: 5,
      notes: "changed",
    });
    expectStatus(reply, 200);
    assert.deepEqual(reply.json, {
      id: book.id,
      title: `check-api ${unique} changed`,
      author: "New Author",
      status: "done",
      rating: 5,
      notes: "changed",
    });
  }
);
rule("PUT /api/books/:id saves the change (GET shows it)", async () => {
  const book = await createBook();
  await call("PUT", `/api/books/${book.id}`, {
    title: `check-api ${unique} saved`,
    author: "A",
    status: "done",
  });
  const reply = await call("GET", `/api/books/${book.id}`);
  assert.equal(reply.json.title, `check-api ${unique} saved`);
  assert.equal(reply.json.status, "done");
});
rule("PUT /api/books/:id ignores an id in the body", async () => {
  const book = await createBook();
  const reply = await call("PUT", `/api/books/${book.id}`, {
    id: "other",
    title: "T",
    author: "A",
  });
  expectStatus(reply, 200);
  assert.equal(reply.json.id, book.id);
});
rule(
  "PUT /api/books/:id with an unknown id returns 404 { error: 'Book not found' }",
  async () => {
    expectError(
      await call("PUT", "/api/books/does-not-exist", {
        title: "T",
        author: "A",
      }),
      404,
      "Book not found"
    );
  }
);
rule(
  "PUT /api/books/:id with an empty title returns 400 { error }",
  async () => {
    const book = await createBook();
    expectError(
      await call("PUT", `/api/books/${book.id}`, { title: "", author: "A" }),
      400
    );
  }
);
rule(
  "PUT /api/books/:id with an invalid status returns 400 and keeps the book",
  async () => {
    const book = await createBook();
    expectError(
      await call("PUT", `/api/books/${book.id}`, {
        title: "T",
        author: "A",
        status: "nope",
      }),
      400
    );
    assert.deepEqual((await call("GET", `/api/books/${book.id}`)).json, book);
  }
);
rule(
  "PUT /api/books/:id with a rating of 6 returns 400 { error }",
  async () => {
    const book = await createBook();
    expectError(
      await call("PUT", `/api/books/${book.id}`, {
        title: "T",
        author: "A",
        rating: 6,
      }),
      400
    );
  }
);
rule("PUT /api/books/:id with invalid JSON returns 400 { error }", async () => {
  const book = await createBook();
  expectError(
    await call("PUT", `/api/books/${book.id}`, undefined, "{nope"),
    400
  );
});

// Delete
rule("DELETE /api/books/:id returns 204 with no body", async () => {
  const book = await createBook();
  const reply = await call("DELETE", `/api/books/${book.id}`);
  expectStatus(reply, 204);
  assert.equal(reply.text, "");
});
rule("a deleted book is gone (GET returns 404)", async () => {
  const book = await createBook();
  await call("DELETE", `/api/books/${book.id}`);
  expectError(
    await call("GET", `/api/books/${book.id}`),
    404,
    "Book not found"
  );
});
rule(
  "DELETE /api/books/:id twice: the second call returns 404 { error: 'Book not found' }",
  async () => {
    const book = await createBook();
    await call("DELETE", `/api/books/${book.id}`);
    expectError(
      await call("DELETE", `/api/books/${book.id}`),
      404,
      "Book not found"
    );
  }
);
rule(
  "DELETE /api/books/:id with an unknown id returns 404 { error: 'Book not found' }",
  async () => {
    expectError(
      await call("DELETE", "/api/books/does-not-exist"),
      404,
      "Book not found"
    );
  }
);

// Filters
rule(
  "GET /api/books?status=reading returns only books with that status",
  async () => {
    const book = await createBook({ status: "reading" });
    const reply = await call("GET", "/api/books?status=reading");
    expectStatus(reply, 200);
    assert.ok(reply.json.every((item: any) => item.status === "reading"));
    assert.ok(reply.json.some((item: any) => item.id === book.id));
  }
);
rule(
  "GET /api/books?status=done does not return a book that is want-to-read",
  async () => {
    const book = await createBook();
    const reply = await call("GET", "/api/books?status=done");
    assert.ok(!reply.json.some((item: any) => item.id === book.id));
  }
);
rule("GET /api/books?q=<text> matches the title, ignoring case", async () => {
  const book = await createBook();
  const reply = await call(
    "GET",
    `/api/books?q=${encodeURIComponent(`CHECK-API ${unique.toUpperCase()}`)}`
  );
  expectStatus(reply, 200);
  assert.ok(reply.json.some((item: any) => item.id === book.id));
  assert.ok(
    reply.json.every((item: any) =>
      item.title.toLowerCase().includes(`check-api ${unique}`)
    )
  );
});
rule("GET /api/books?q=<text> trims the text", async () => {
  const book = await createBook();
  const reply = await call(
    "GET",
    `/api/books?q=${encodeURIComponent(`  check-api ${unique}  `)}`
  );
  assert.ok(reply.json.some((item: any) => item.id === book.id));
});
rule("GET /api/books?q=<text> does not search the author", async () => {
  const book = await createBook({ author: `zzauthor${unique}` });
  const reply = await call("GET", `/api/books?q=zzauthor${unique}`);
  assert.deepEqual(reply.json, []);
  assert.ok(book.id);
});
rule("GET /api/books with status and q combines both filters", async () => {
  const a = await createBook({ status: "done" });
  const b = await createBook({ status: "reading" });
  const reply = await call(
    "GET",
    `/api/books?status=done&q=${encodeURIComponent(`check-api ${unique}`)}`
  );
  const ids = reply.json.map((item: any) => item.id);
  assert.ok(ids.includes(a.id));
  assert.ok(!ids.includes(b.id));
});
rule("GET /api/books?q=<no match> returns 200 and an empty array", async () => {
  const reply = await call(
    "GET",
    `/api/books?q=${encodeURIComponent(`no-book-has-this-title-${unique}`)}`
  );
  expectStatus(reply, 200);
  assert.deepEqual(reply.json, []);
});

async function main() {
  try {
    await call("GET", "/api/health");
  } catch {
    console.error(
      `Cannot reach ${BASE}. Start the server first (npm run dev) and try again.`
    );
    process.exit(2);
  }

  console.log(`Checking the API contract at ${BASE}\n`);
  let failed = 0;

  for (const [name, run] of rules) {
    try {
      await run();
      console.log(`PASS  ${name}`);
    } catch (error) {
      failed += 1;
      const message = (error instanceof Error ? error.message : String(error))
        .replace(/\s+/g, " ")
        .slice(0, 160);
      console.log(`FAIL  ${name}\n      ${message}`);
    }
  }

  for (const id of created) {
    await call("DELETE", `/api/books/${id}`).catch(() => undefined);
  }

  console.log(`\n${rules.length - failed} of ${rules.length} rules pass.`);
  process.exit(failed === 0 ? 0 : 1);
}

await main();
