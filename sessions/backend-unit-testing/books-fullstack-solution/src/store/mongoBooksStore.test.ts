import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";

import { BookModel } from "../models/Book";
import { mongoBooksStore } from "./mongoBooksStore";

// Optional challenge 3: the real store against a real mongod that lives in memory.
// Never call connectToDatabase() here: it would use the MONGODB_URI of your .env.
let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await mongoose.connect(server.getUri("reading-list-test"));
});

beforeEach(async () => {
  // A guard before deleteMany: never delete in a database that is not a test database.
  expect(mongoose.connection.name.endsWith("-test")).toBe(true);
  await BookModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

const input = {
  title: "Dune",
  author: "Frank Herbert",
  status: "reading",
  rating: null,
  notes: "",
} as const;

describe("mongoBooksStore", () => {
  test("create returns id and no _id", async () => {
    const book = await mongoBooksStore.create(input);
    expect(book.id).toMatch(/^[0-9a-f]{24}$/);
    expect(book).not.toHaveProperty("_id");
    expect(book).not.toHaveProperty("__v");
  });

  test("a malformed id is a book that does not exist", async () => {
    expect(await mongoBooksStore.get("abc")).toBeUndefined();
    expect(await mongoBooksStore.replace("abc", input)).toBeUndefined();
    expect(await mongoBooksStore.remove("abc")).toBe(false);
  });

  test("the search text is escaped", async () => {
    await mongoBooksStore.create(input);
    expect(await mongoBooksStore.list({ q: "(" })).toEqual([]);
    expect(await mongoBooksStore.list({ q: ".*" })).toEqual([]);
    expect(await mongoBooksStore.list({ q: "DUN" })).toHaveLength(1);
  });

  test("replace validates", async () => {
    const book = await mongoBooksStore.create(input);
    await expect(
      mongoBooksStore.replace(book.id, { ...input, title: "" })
    ).rejects.toThrow(/title is required/);
  });
});
