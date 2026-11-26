import { useEffect, useState } from "react";
import { authClient } from "./auth-client";

// What our backend sends (see backend/src/server.ts)
type Me = {
  name: string;
  email: string;
  image: string;
  createdAt: string;
};

type User = {
  name: string;
  image: string;
};

export default function App() {
  // Who is logged in? Updates by itself after login and logout.
  const { data: session, isPending } = authClient.useSession();
  const [me, setMe] = useState<Me | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // NEW: after the login, load my data and all users from the backend (= from the database)
  useEffect(() => {
    if (!session) return;
    fetch("/api/me").then((response) => response.json()).then(setMe);
    fetch("/api/users").then((response) => response.json()).then(setUsers);
  }, [session?.user.id]);

  function login() {
    authClient.signIn.social({ provider: "github", callbackURL: "/" });
  }

  function logout() {
    authClient.signOut();
    setMe(null);
    setUsers([]);
  }

  if (isPending) {
    return <main>Loading...</main>;
  }

  if (!session) {
    return (
      <main>
        <h1>Hello stranger 👋</h1>
        <button onClick={login}>Log in with GitHub</button>
      </main>
    );
  }

  return (
    <main>
      <img src={session.user.image ?? ""} alt="" width="80" height="80" />
      <h1>Hello {session.user.name} 👋</h1>
      {me && <p>In our database since {new Date(me.createdAt).toLocaleString()}</p>}

      <h2>Everybody who has logged in</h2>
      <ul>
        {users.map((user) => (
          <li key={user.name + user.image}>
            <img src={user.image} alt="" width="24" height="24" /> {user.name}
          </li>
        ))}
      </ul>

      <button onClick={logout}>Log out</button>
    </main>
  );
}
