import { createAuthClient } from "better-auth/react";

// Talks to /api/auth on the same address (Vite forwards it to Express).
export const authClient = createAuthClient();
