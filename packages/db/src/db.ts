import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { envRuntime, type Environment } from "@packages/env";
import * as schema from "./schema";
import { Logger } from "drizzle-orm/logger";
import { createLogger } from "@packages/logger";

const logger = createLogger("db");

class CustomLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger.info({ query, params }, "Executing database query");
  }
}

/**
 * Function to create drizzle instance on request
 * @param env - Environment variable from packages/env
 * @returns \{ db }
 */
export function createDb(env: Environment) {
  const client = new Pool({
    connectionString: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_URL}/${env.DB_NAME}`,
  });

  const db = drizzle({
    client,
    schema,
    logger: envRuntime.NODE_ENV !== "production" ? new CustomLogger() : false,
  });

  return { db };
}
