import { createMiddleware } from "hono/factory";
import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";
import crypto from "node:crypto";

export function loggerMiddleware() {
  return createMiddleware((c, next) =>
    pinoLogger({
      pino: pino(
        { level: c.env.LOG_LEVEL },
        c.env.NODE_ENV === "production" ? undefined : pretty(),
      ),
      http: {
        reqId: () => crypto.randomUUID(),
      },
    })(c, next),
  );
}
