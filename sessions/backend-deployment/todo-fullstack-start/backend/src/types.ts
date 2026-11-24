/** What the API sends: one todo. */
export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

/** What the API receives for POST and PUT. */
export type NewTodo = {
  title: string;
  done: boolean;
};
