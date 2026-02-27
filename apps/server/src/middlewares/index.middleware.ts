import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import type { AppOpenAPI } from "@/server/lib/types";
import { loggerMiddleware } from "./logger.middleware";
import { corsMiddleware } from "./cors.middleware";
import { parseEnv } from "@packages/env";
import { dbMiddleware } from "./db.middleware";

export default function configureMiddlewares(app: AppOpenAPI) {
  app.use((c, next) => {
    parseEnv(Object.assign(c.env || {}, process.env));
    return next();
  });
  app.use(serveEmojiFavicon("🔥"));
  app.use("/api/*", corsMiddleware());
  app.use(loggerMiddleware());
  app.use(dbMiddleware());
  app.notFound(notFound);
  app.onError(onError);
}
