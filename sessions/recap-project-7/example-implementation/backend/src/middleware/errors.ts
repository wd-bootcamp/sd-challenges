import type { ErrorRequestHandler, RequestHandler } from "express";

/** An error with a status code that the client may see. */
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export const notFound: RequestHandler = (_request, response) => {
  response.status(404).json({ error: "Not found" });
};

export const errorHandler: ErrorRequestHandler = (
  err,
  _request,
  response,
  _next
) => {
  if (err instanceof HttpError) {
    response.status(err.status).json({ error: err.message });
    return;
  }
  // express.json() throws this for a body that is not valid JSON.
  if (err?.type === "entity.parse.failed") {
    response.status(400).json({ error: "Invalid JSON body" });
    return;
  }
  if (err?.type === "entity.too.large") {
    response.status(413).json({ error: "Request body too large" });
    return;
  }
  // Everything else is our bug: log it, do not leak details.
  console.error(err);
  response.status(500).json({ error: "Internal server error" });
};
