import { betterAuth } from "better-auth";

// The whole login in one place.
// No database: Better Auth keeps the login in an encrypted cookie ("stateless").
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: {
    github: {
      // "as string": we tell TypeScript that this value is in .env
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
