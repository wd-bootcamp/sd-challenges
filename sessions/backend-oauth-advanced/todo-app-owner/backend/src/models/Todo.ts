import { Schema, model, type HydratedDocument } from "mongoose";

import type { NewTodo, Todo } from "../types";

// In the database a todo also has an owner: the id of the Better Auth user. It is not part of the API.
type TodoDocument = NewTodo & { owner: string };

const todoSchema = new Schema<TodoDocument>({
  title: { type: String, required: true, trim: true },
  done: { type: Boolean, default: false },
  owner: { type: String, required: true },
});

// The collection is called "todos": the lower-case plural of "Todo".
export const TodoModel = model("Todo", todoSchema);

/** Turns a document into the plain `Todo` object the API sends: `id` instead of `_id`, no `__v`, no `owner`. */
export function toTodo(doc: HydratedDocument<TodoDocument>): Todo {
  return {
    id: doc.id,
    title: doc.title,
    done: doc.done,
  };
}
