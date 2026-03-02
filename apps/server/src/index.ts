import { serve } from "@hono/node-server";
import app from "./app";
import { envRuntime as env } from "@packages/env";
import process from "process";
import { createLogger } from "@packages/logger";

const logger = createLogger("server");
const port = env.PORT;

const server = serve(
  {
    fetch: app.fetch,
    port,
  },
  () => {
    logger.info(`Server is running on http://localhost:${port}`);
  },
);

function gracefulShutdown(signal: string) {
  logger.info(`${signal} received. Initiating graceful shutdown`);
  server.close((error) => {
    if (error) {
      logger.error({ error }, "Error shutting down server");
      process.exit(1);
    }
    logger.info("Server closed");
    process.exit(0);
  });
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
