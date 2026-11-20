import { Schema, model, type HydratedDocument } from "mongoose";

import type { NewTodo, Todo } from "../types";

const todoSchema = new Schema<NewTodo>({
  title: { type: String, required: true, trim: true },
  done: { type: Boolean, default: false },
});

// The collection is called "todos": the lower-case plural of "Todo".
export const TodoModel = model("Todo", todoSchema);

/** Turns a document into the plain `Todo` object the API sends: `id` instead of `_id`, no `__v`. */
export function toTodo(doc: HydratedDocument<NewTodo>): Todo {
  return {
    id: doc.id,
    title: doc.title,
    done: doc.done,
  };
}
