import { AppBindings } from "@/server/lib/types";
import { createDb } from "@packages/db";
import { createMiddleware } from "hono/factory";

export function dbMiddleware() {
  return createMiddleware<AppBindings>(async (c, next) => {
    const { db } = createDb(c.env);
    c.set("db", db);

    await next();

    await db.$client.end();
  });
}
