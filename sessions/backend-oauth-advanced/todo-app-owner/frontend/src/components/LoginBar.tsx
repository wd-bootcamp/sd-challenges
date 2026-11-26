import { authClient } from "../auth-client";

export default function LoginBar() {
  // Who is logged in? Updates by itself after login and logout.
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p className="login-bar">Checking login…</p>;
  }

  if (!session) {
    return (
      <p className="login-bar">
        Not logged in{" "}
        <button
          type="button"
          onClick={() =>
            authClient.signIn.social({ provider: "github", callbackURL: "/" })
          }
        >
          Log in with GitHub
        </button>
      </p>
    );
  }

  return (
    <p className="login-bar">
      <img src={session.user.image ?? ""} alt="" width="32" height="32" />
      Logged in as {session.user.name}{" "}
      <button type="button" onClick={() => authClient.signOut()}>
        Log out
      </button>
    </p>
  );
}
