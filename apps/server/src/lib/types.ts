import type { Environment } from "@packages/env";
import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Session, User } from "@packages/auth";
import { NodePgDatabase } from "@packages/db/drizzle";
import type { PinoLogger } from "hono-pino";
import type { Pool } from "pg";
import { schema } from "@packages/db";

export type AppBindings = {
  Bindings: Environment;
  Variables: {
    logger: PinoLogger;
    user: User;
    session: Session;
    db: NodePgDatabase<typeof schema> & { $client: Pool };
    client: Pool;
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
