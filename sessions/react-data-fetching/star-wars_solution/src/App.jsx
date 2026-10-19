import { useState } from "react";
import { SWRConfig } from "swr";
import Character from "./components/Character";
import Layout from "./components/Layout";
import "./styles.css";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function App() {
  const [id, setId] = useState(1);

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Layout>
        <h1>React Data Fetching: Star Wars</h1>
        <ul className="characters">
          <li>
            <button type="button" onClick={() => setId(1)}>
              Luke Skywalker
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setId(2)}>
              C-3PO
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setId(3)}>
              R2-D2
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setId(4)}>
              Darth Vader
            </button>
          </li>
        </ul>
        <Character id={id} />
      </Layout>
    </SWRConfig>
  );
}
