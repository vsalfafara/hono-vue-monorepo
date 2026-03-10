import { HTTPStatusCodes } from "@/server/lib/helpers";
import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const tags = ["Health"];

export const checkHealthRoute = createRoute({
  tags,
  path: "/health",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(createMessageObjectSchema("ok"), "ok"),
  },
});

export type CheckHealthRoute = typeof checkHealthRoute;
