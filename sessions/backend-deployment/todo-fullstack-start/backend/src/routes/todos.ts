import { Router } from "express";

import { TodoModel, toTodo } from "../models/Todo";
import type { NewTodo } from "../types";

export const todosRouter = Router();

// GET /api/todos
todosRouter.get("/", async (_request, response) => {
  const docs = await TodoModel.find();
  response.json(docs.map(toTodo));
});

// POST /api/todos
todosRouter.post("/", async (request, response) => {
  const doc = await TodoModel.create(request.body as NewTodo);
  response.status(201).json(toTodo(doc));
});

// PUT /api/todos/:id
todosRouter.put("/:id", async (request, response) => {
  const doc = await TodoModel.findByIdAndUpdate(
    request.params.id,
    request.body as NewTodo,
    {
      returnDocument: "after", // return the updated document, not the old one
      runValidators: true, // an update skips the schema rules unless you ask for them
    }
  );

  if (!doc) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  response.json(toTodo(doc));
});

// DELETE /api/todos/:id
todosRouter.delete("/:id", async (request, response) => {
  const doc = await TodoModel.findByIdAndDelete(request.params.id);

  if (!doc) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  response.status(204).end();
});
