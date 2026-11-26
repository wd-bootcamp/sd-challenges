import { Router } from "express";

import { requireAuth } from "../middleware/auth";
import { TodoModel, toTodo } from "../models/Todo";
import type { NewTodo } from "../types";

export const todosRouter = Router();

// Every todo route needs a login. requireAuth puts the user id into response.locals.userId.
todosRouter.use(requireAuth);

// GET /api/todos: only my todos
todosRouter.get("/", async (_request, response) => {
  const docs = await TodoModel.find({ owner: response.locals.userId });
  response.json(docs.map(toTodo));
});

// POST /api/todos: the owner comes from the session, never from the body
todosRouter.post("/", async (request, response) => {
  const doc = await TodoModel.create({
    ...(request.body as NewTodo),
    owner: response.locals.userId,
  });
  response.status(201).json(toTodo(doc));
});

// PUT /api/todos/:id: only my todo
todosRouter.put("/:id", async (request, response) => {
  const doc = await TodoModel.findOneAndUpdate(
    { _id: request.params.id, owner: response.locals.userId },
    request.body as NewTodo,
    {
      returnDocument: "after", // return the updated document, not the old one
      runValidators: true, // an update skips the schema rules unless you ask for them
    }
  );

  // Not there, or the todo of somebody else: both are a 404.
  if (!doc) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  response.json(toTodo(doc));
});

// DELETE /api/todos/:id: only my todo
todosRouter.delete("/:id", async (request, response) => {
  const doc = await TodoModel.findOneAndDelete({
    _id: request.params.id,
    owner: response.locals.userId,
  });

  if (!doc) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  response.status(204).end();
});
