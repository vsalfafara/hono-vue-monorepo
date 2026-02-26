import { z } from "zod";
import { load } from "dotenv-mono";

load();

const serverEnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
  DB_URL: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
});

export type Environment = z.infer<typeof serverEnvSchema>;

export function parseEnv(envToParse: Environment) {
  const { data: env, error } = serverEnvSchema.safeParse(envToParse);

  if (error) {
    const errorMessage = `Invalid env:\n${Object.values(z.treeifyError(error))
      .map((error) => {
        const err = Object.entries(error)
          .map(([key, value]) => {
            return `${key}: ${value.errors.join("")}`;
          })
          .join("\n");
        return err;
      })
      .join("")}`;
    throw new Error(errorMessage);
    process.exit(1);
  }

  return env;
}
