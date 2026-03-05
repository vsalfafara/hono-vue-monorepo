import { AppRouteHandler } from "@/server/lib/types";
import {
  CreateTaskRoute,
  GetTaskRoute,
  ListTasksRoute,
  UpdateTaskRoute,
} from "./tasks.routes";
import { tasks } from "@packages/db/schema";
import { HTTPStatusCodes } from "@/server/lib/helpers";
import { eq } from "@packages/db/drizzle";

export const listTasksHandler: AppRouteHandler<ListTasksRoute> = async ({
  json,
  get,
}) => {
  const db = get("db");
  const authUser = get("user");
  const result = await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.userId, authUser.id),
  });

  return json(result, HTTPStatusCodes.OK);
};

export const getTaskHandler: AppRouteHandler<GetTaskRoute> = async ({
  json,
  get,
  req,
}) => {
  const db = get("db");
  const { id } = req.valid("param");
  const result = await db.query.tasks.findFirst({
    where: (tasks, { eq }) => eq(tasks.id, id),
  });

  if (!result)
    return json({ message: "Task not found" }, HTTPStatusCodes.NOT_FOUND);
  return json(result, HTTPStatusCodes.OK);
};

export const createTaskHandler: AppRouteHandler<CreateTaskRoute> = async ({
  json,
  get,
  req,
}) => {
  const body = req.valid("json");
  const db = get("db");
  const authUser = get("user");
  const [result] = await db
    .insert(tasks)
    .values({ ...body, userId: authUser.id })
    .returning();

  return json(result, HTTPStatusCodes.OK);
};

export const updateTaskHandler: AppRouteHandler<UpdateTaskRoute> = async ({
  json,
  get,
  req,
}) => {
  const body = req.valid("json");
  const { id } = req.valid("param");
  const db = get("db");
  const [result] = await db
    .update(tasks)
    .set(body)
    .where(eq(tasks.id, id))
    .returning();

  if (!result)
    return json({ message: "Task not found" }, HTTPStatusCodes.NOT_FOUND);

  return json(result, HTTPStatusCodes.OK);
};
