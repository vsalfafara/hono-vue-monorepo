import { createDb } from "@packages/db";
import { envRuntime } from "@packages/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin as adminPlugin,
  organization as organizationPlugin,
} from "better-auth/plugins";
import { user, admin, ac } from "./permissions";

const { db } = createDb(envRuntime);

/**
 * Better-auth instance on runtime. Only used for generating schemas or seeds
 */
const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    adminPlugin({
      ac,
      roles: {
        user,
        admin,
      },
    }),
    organizationPlugin(),
  ],
});

export default auth;
