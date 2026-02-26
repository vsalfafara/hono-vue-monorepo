import { AppBindings } from "@/server/lib/types";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";

export function corsMiddleware() {
  return createMiddleware<AppBindings>((c, next) =>
    cors({
      origin: ["http://localhost:5173"],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })(c, next),
  );
}
