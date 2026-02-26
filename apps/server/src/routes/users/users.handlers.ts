import { AppRouteHandler } from "../../lib/types";
import { GetUserRoute, ListUsersRoute } from "./users.routes";
import { createDb } from "@packages/db";
import { HTTPStatusCodes } from "../../lib/helpers";
import { eq } from "drizzle-orm";
import { user } from "@packages/db/schema";

export const listUsersHandler: AppRouteHandler<ListUsersRoute> = async ({
  json,
  env,
}) => {
  const { db } = createDb(env);
  const result = await db.query.user.findMany();

  return json(result, HTTPStatusCodes.OK);
};

export const getUserHandler: AppRouteHandler<GetUserRoute> = async ({
  json,
  req,
  env,
}) => {
  const { db } = createDb(env);
  const { id } = req.valid("param");
  const result = await db.query.user.findFirst({ where: eq(user.id, id) });

  if (!result)
    return json({ message: "User not found" }, HTTPStatusCodes.NOT_FOUND);

  return json(result, HTTPStatusCodes.OK);
};
