import { useState } from "react";
import { authClient } from "./auth-client";

export default function App() {
  // Who is logged in? Updates by itself after login and logout.
  const { data: session, isPending } = authClient.useSession();
  const [me, setMe] = useState<unknown>(null);

  function login() {
    authClient.signIn.social({ provider: "github", callbackURL: "/" });
  }

  function logout() {
    authClient.signOut();
    setMe(null);
  }

  // Ask OUR backend: who am I?
  async function askBackend() {
    const response = await fetch("/api/me");
    setMe(await response.json());
  }

  if (isPending) {
    return <main>Loading...</main>;
  }

  if (!session) {
    return (
      <main>
        <h1>Hello stranger 👋</h1>
        <button onClick={login}>Log in with GitHub</button>
        <button onClick={askBackend}>Ask the backend: who am I?</button>
        {me !== null && <pre>{JSON.stringify(me, null, 2)}</pre>}
      </main>
    );
  }

  return (
    <main>
      <img src={session.user.image ?? ""} alt="" width="80" height="80" />
      <h1>Hello {session.user.name} 👋</h1>
      <button onClick={askBackend}>Ask the backend: who am I?</button>
      <button onClick={logout}>Log out</button>
      {me !== null && <pre>{JSON.stringify(me, null, 2)}</pre>}
    </main>
  );
}
