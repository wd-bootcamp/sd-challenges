import { useState } from "react";
import "./styles.css";

// Step 1: Define a type `Todo` with the properties `id` (number), `text` (string)
// and `isDone` (boolean).

// Step 2: Give the `todos` state its type: an array of `Todo`.
// Experiment: change the initial value to `[]` without a type. TypeScript infers `never[]`
// and every update becomes an error. This is why an empty array needs an explicit type.
// Step 3: `selectedId` should either be the id of a todo (number) or `null`
// if no todo is selected. Type the state with a union.

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn TypeScript", isDone: false },
    { id: 2, text: "Type some state", isDone: false },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [count, setCount] = useState(0);

  // Step 4: Type the parameter of the handlers. `id` is a number, `text` is a string.
  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    setSelectedId(null);
  }

  function handleAdd(text) {
    setTodos([...todos, { id: Date.now(), text, isDone: false }]);
    setCount(count + 1);
  }

  const selectedTodo = todos.find((todo) => todo.id === selectedId);

  return (
    <main>
      <h1>Todos</h1>
      <p>Added in this session: {count}</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span onClick={() => setSelectedId(todo.id)}>
              {todo.isDone ? "✅" : "⬜️"} {todo.text}
            </span>
            <button onClick={() => handleToggle(todo.id)}>Toggle</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAdd("New todo")}>Add todo</button>

      {/* Step 5: `selectedTodo` can be undefined. TypeScript makes sure you check that
          before you use it. Show the text of the selected todo or "Nothing selected". */}
      <p>Selected: {selectedTodo.text}</p>

      {/* Step 6: Try `setCount("one")` somewhere. Read the error message. */}
    </main>
  );
}
