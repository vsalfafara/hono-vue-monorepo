import { env } from "@packages/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_URL}:${env.DB_PORT}/${env.DB_NAME}`,
  },
});
