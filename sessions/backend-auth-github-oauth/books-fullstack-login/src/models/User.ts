import { Schema, model, type HydratedDocument } from "mongoose";

/** What we keep of a GitHub profile. `githubId` is the stable identity. */
export type NewUser = {
  githubId: number;
  login: string;
  name: string | null;
  avatarUrl: string;
};

/** The user the API sends. No `githubId`, no `_id`, no `__v`. */
export type User = { id: string } & Omit<NewUser, "githubId">;

const userSchema = new Schema<NewUser>({
  githubId: { type: Number, required: true },
  login: { type: String, required: true },
  name: { type: String, default: null },
  avatarUrl: { type: String, required: true },
});

export const UserModel = model("User", userSchema);

export function toUser(doc: HydratedDocument<NewUser>): User {
  return {
    id: doc.id,
    login: doc.login,
    name: doc.name,
    avatarUrl: doc.avatarUrl,
  };
}
