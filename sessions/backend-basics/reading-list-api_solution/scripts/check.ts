// Calls the running server and reports pass or fail for each requirement.
// Usage: npm run check            (core requirements)
//        npm run check -- --bonus (also the bonus requirements)
// Another address: BASE_URL=http://localhost:4000 npm run check
import assert from "node:assert/strict";

import seed from "../src/seed.json";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";
const withBonus = process.argv.includes("--bonus");

type Check = { name: string; run: () => Promise<void> };

async function get(path: string) {
  const response = await fetch(`${BASE_URL}${path}`);
  const text = await response.text();
  let body: unknown = undefined;
  try {
    body = JSON.parse(text);
  } catch {
    // the body is not JSON, `body` stays undefined
  }
  return {
    status: response.status,
    type: response.headers.get("content-type") ?? "",
    body,
    text,
  };
}

function expectJson(res: Awaited<ReturnType<typeof get>>, status: number) {
  assert.equal(
    res.status,
    status,
    `expected status ${status}, got ${res.status}`
  );
  assert.match(
    res.type,
    /application\/json/,
    `expected a JSON response, got "${res.type}" (use res.json)`
  );
}

const core: Check[] = [
  {
    name: "GET /api/health returns 200 and { status: 'ok' }",
    run: async () => {
      const res = await get("/api/health");
      expectJson(res, 200);
      assert.deepEqual(res.body, { status: "ok" });
    },
  },
  {
    name: "GET /api/books returns 200 and all books of the seed file",
    run: async () => {
      const res = await get("/api/books");
      expectJson(res, 200);
      assert.deepEqual(res.body, seed);
    },
  },
  {
    name: "GET /api/books/count returns 200 and { count: <number of books> }",
    run: async () => {
      const res = await get("/api/books/count");
      expectJson(res, 200);
      assert.deepEqual(res.body, { count: seed.length });
    },
  },
  {
    name: "GET /api/unknown returns 404 and { error: 'Not found' }",
    run: async () => {
      const res = await get("/api/unknown");
      expectJson(res, 404);
      assert.deepEqual(res.body, { error: "Not found" });
    },
  },
];

const bonus: Check[] = [
  {
    name: "BONUS GET /api/books?status=done returns only the books with this status",
    run: async () => {
      const res = await get("/api/books?status=done");
      expectJson(res, 200);
      assert.deepEqual(
        res.body,
        seed.filter((book) => book.status === "done")
      );
    },
  },
  {
    name: "BONUS GET /api/books?status=banana returns 400 and an error message",
    run: async () => {
      const res = await get("/api/books?status=banana");
      expectJson(res, 400);
      const body = res.body as { error?: unknown };
      assert.equal(
        typeof body?.error,
        "string",
        "expected { error: '<message>' }"
      );
    },
  },
];

async function main() {
  try {
    await fetch(`${BASE_URL}/api/health`);
  } catch {
    console.error(`Cannot reach ${BASE_URL}.`);
    console.error("Start the server in another terminal first: npm run dev");
    process.exit(1);
  }

  const checks = withBonus ? [...core, ...bonus] : core;
  let failed = 0;

  for (const check of checks) {
    try {
      await check.run();
      console.log(`PASS  ${check.name}`);
    } catch (error) {
      failed += 1;
      console.log(`FAIL  ${check.name}`);
      const message = error instanceof Error ? error.message : String(error);
      console.log(`      ${message.split("\n")[0]}`);
    }
  }

  console.log(`\n${checks.length - failed} of ${checks.length} checks passed.`);
  if (!withBonus)
    console.log("Run `npm run check -- --bonus` to include the bonus checks.");
  process.exit(failed === 0 ? 0 : 1);
}

main();
