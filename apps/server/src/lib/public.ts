import { serveStatic } from "@hono/node-server/serve-static";
import { AppOpenAPI } from "./types";

export function configurePublic(app: AppOpenAPI) {
  app.use(
    "/*",
    serveStatic({ root: "./public" }),
    serveStatic({ root: "./public", path: "index.html" }),
  );
}
