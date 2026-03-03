import { envRuntime } from "@packages/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${envRuntime.DB_USER}:${envRuntime.DB_PASSWORD}@${envRuntime.DB_URL}:${envRuntime.DB_PORT}/${envRuntime.DB_NAME}`,
  },
});
