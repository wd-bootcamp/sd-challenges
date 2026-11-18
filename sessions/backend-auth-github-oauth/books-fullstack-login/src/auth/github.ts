import { requireEnv } from "../env";
import type { NewUser } from "../models/User";

const AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const TOKEN_URL = "https://github.com/login/oauth/access_token";
const USER_URL = "https://api.github.com/user";

/** Step 1: the address the browser is sent to. GitHub uses the callback URL registered for the app. */
export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: requireEnv("GITHUB_CLIENT_ID"),
    state,
  });
  return `${AUTHORIZE_URL}?${params}`;
}

/** Step 2: swap the one-time code for an access token. */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: requireEnv("GITHUB_CLIENT_ID"),
      client_secret: requireEnv("GITHUB_CLIENT_SECRET"),
      code,
    }),
  });
  // A wrong or used code is status 200 with { error: "bad_verification_code" }.
  const body = (await response.json()) as {
    access_token?: string;
    error?: string;
  };
  if (!response.ok || !body.access_token) {
    throw new Error(
      `GitHub did not return a token: ${body.error ?? response.status}`
    );
  }
  return body.access_token;
}

/** Step 3: ask GitHub who the token belongs to. The token is not stored. */
export async function fetchGitHubUser(accessToken: string): Promise<NewUser> {
  const response = await fetch(USER_URL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "books-api", // GitHub rejects requests without one
    },
  });
  if (!response.ok) {
    throw new Error(`GitHub user request failed: ${response.status}`);
  }
  const profile = (await response.json()) as {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
  };
  return {
    githubId: profile.id,
    login: profile.login,
    name: profile.name,
    avatarUrl: profile.avatar_url,
  };
}
