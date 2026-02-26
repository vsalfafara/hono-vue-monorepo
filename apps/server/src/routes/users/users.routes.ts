import { createRoute, z } from "@hono/zod-openapi";
import { HTTPStatusCodes, IdParamsSchema } from "../../lib/helpers";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import {
  adminMiddleware,
  authMiddleware,
} from "../../middlewares/auth.middleware";
import { selectUserSchema } from "@packages/db/validators";

const tags = ["Users"];

export const listUsersRoute = createRoute({
  tags,
  middleware: [authMiddleware(), adminMiddleware({ user: ["list"] })],
  path: "/users",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.array(selectUserSchema),
      "List of Users",
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export const getUserRoute = createRoute({
  tags,
  middleware: [authMiddleware(), adminMiddleware({ user: ["get"] })],
  path: "/users/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectUserSchema, "Requested User"),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("User not found"),
      "User not found",
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export type ListUsersRoute = typeof listUsersRoute;
export type GetUserRoute = typeof getUserRoute;
