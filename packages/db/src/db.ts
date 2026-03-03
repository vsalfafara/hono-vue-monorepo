import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { Environment } from "@packages/env";
import * as schema from "./schema";

/**
 * Function to create drizzle instance on request
 * @param env - Environment variable from packages/env
 * @returns \{ db }
 */
export function createDb(env: Environment) {
  const client = new Pool({
    connectionString: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_URL}/${env.DB_NAME}`,
  });

  const db = drizzle({ client, schema });

  return { db };
}
