import { createMiddleware } from "hono/factory";
import { pinoLogger } from "hono-pino";
import crypto from "node:crypto";
import { createLogger } from "@packages/logger";

export function loggerMiddleware() {
  return createMiddleware((c, next) =>
    pinoLogger({
      pino: createLogger("server-api", c.env),
      http: {
        reqId: () => crypto.randomUUID(),
      },
    })(c, next),
  );
}
