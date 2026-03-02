import pino from "pino";
import pretty from "pino-pretty";
import { type Environment } from "@packages/env";

export function createLogger(name: string, env?: Environment) {
  return pino(
    {
      name,
      level: env?.LOG_LEVEL || "info",
    },
    env?.NODE_ENV === "production" ? undefined : pretty(),
  );
}
