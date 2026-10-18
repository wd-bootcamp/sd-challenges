import { useState } from "react";
import "./styles.css";

type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn TypeScript", isDone: false },
    { id: 2, text: "Type some state", isDone: false },
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  function handleToggle(id: number): void {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  function handleDelete(id: number): void {
    setTodos(todos.filter((todo) => todo.id !== id));
    setSelectedId(null);
  }

  function handleAdd(text: string): void {
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

      <p>Selected: {selectedTodo ? selectedTodo.text : "Nothing selected"}</p>

      {/* setCount("one"); // Error: Argument of type 'string' is not assignable to parameter of type 'SetStateAction<number>'. */}
    </main>
  );
}
