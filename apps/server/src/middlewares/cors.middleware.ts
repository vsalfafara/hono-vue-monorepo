import { AppBindings } from "@/server/lib/types";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";

/** Use this middleware if clients served outside the server are accessing resources */
export function corsMiddleware() {
  return createMiddleware<AppBindings>((c, next) =>
    cors({
      origin: [""],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })(c, next),
  );
}
