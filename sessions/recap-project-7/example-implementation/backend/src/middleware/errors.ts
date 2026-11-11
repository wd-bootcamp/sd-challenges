import type { ErrorRequestHandler, RequestHandler } from "express";
import mongoose from "mongoose";

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
  // The schema rejected a value (second line of defense after parseBookInput).
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((fieldError) => fieldError.message)
      .join(", ");
    response.status(400).json({ error: message });
    return;
  }
  // Log the details on the server, send nothing internal to the client.
  console.error(err);
  response.status(500).json({ error: "Internal server error" });
};
