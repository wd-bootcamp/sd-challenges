import type { ErrorRequestHandler, RequestHandler } from "express";
import { Error as MongooseError } from "mongoose";

/** Runs when no route matched. */
export const notFound: RequestHandler = (_request, response) => {
  response.status(404).json({ error: "Not found" });
};

/** Runs when a route or a middleware threw an error. Express knows it by the four parameters. */
export const errorHandler: ErrorRequestHandler = (
  err,
  _request,
  response,
  _next
) => {
  // express.json() throws a SyntaxError with status 400 for a body that is not valid JSON.
  if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    response.status(400).json({ error: "Invalid JSON body" });
    return;
  }
  // mongoose rejects data that breaks the schema, for example a todo without a title.
  if (err instanceof MongooseError.ValidationError) {
    response
      .status(400)
      .json({ error: "A todo needs a title, and done must be true or false" });
    return;
  }
  // mongoose cannot turn an id like "abc" into an ObjectId.
  if (err instanceof MongooseError.CastError) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  // Log the details on the server, send nothing internal to the client.
  console.error(err);
  response.status(500).json({ error: "Internal server error" });
};
