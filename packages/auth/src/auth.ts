import type { Environment } from "@packages/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  openAPI,
  admin as adminPlugin,
  organization as organizationPlugin,
} from "better-auth/plugins";
import { createDb } from "@packages/db";
import { user, admin, ac } from "./permissions";

/**
 * Better-auth instance on request. Used in auth.middleware to access prohibited routes and services
 * @param env - Environment variable from packages/env
 * @returns better-auth instance
 */
export function auth(env: Environment) {
  const { db } = createDb(env);
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      openAPI(),
      adminPlugin({
        ac,
        roles: {
          user,
          admin,
        },
      }),
      organizationPlugin(),
    ],
    advanced: {
      defaultCookieAttributes: {
        sameSite: "lax",
        secure: true,
        httpOnly: true,
      },
    },
    trustedOrigins: ["http://localhost:5173"],
  });
}
