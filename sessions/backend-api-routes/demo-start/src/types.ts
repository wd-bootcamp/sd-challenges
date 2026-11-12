export type Quote = {
  id: string;
  text: string;
  author: string;
};

/** The data a client sends to create a quote. The `id` is created by the server. */
export type NewQuote = Omit<Quote, "id">;
