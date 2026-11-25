import type { ErrorRequestHandler, RequestHandler } from "express";

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
  // Log the details on the server, send nothing internal to the client.
  console.error(err);
  response.status(500).json({ error: "Internal server error" });
};
