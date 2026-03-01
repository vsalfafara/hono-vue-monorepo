import { createAuthClient } from "better-auth/vue";
import { adminClient } from "better-auth/client/plugins";
import client from "@packages/rpc";

export const authClient = createAuthClient({
  plugins: [adminClient()],
});

export const api = client("/api");
