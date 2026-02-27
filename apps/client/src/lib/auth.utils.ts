import { createAuthClient } from "better-auth/vue";
import { adminClient } from "better-auth/client/plugins";
import client from "@packages/rpc";

export const authClient = createAuthClient({
  baseURL: "http://localhost:9999",
  plugins: [adminClient()],
});

export const api = client("/");
