import { serve } from "@hono/node-server";
import app from "./app";
import { envRuntime as env } from "@packages/env";
import process from "process";

const port = env.PORT;
console.log(`Server is running on http://localhost:${port}`);

const server = serve({
  fetch: app.fetch,
  port,
});

function gracefulShutdown(signal: string) {
  console.log(`${signal} received. Initiating graceful shutdown`);
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log("Server closed");
    process.exit(0);
  });
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
