import { AppRouteHandler } from "@/server/lib/types";
import { GetTasksCountDataRoute, GetTasksDataRoute } from "./dashboard.routes";
import { tasks } from "@packages/db/schema";
import { count, eq } from "@packages/db/drizzle";
import { HTTPStatusCodes } from "@/server/lib/helpers";

export const getTaskDataHandler: AppRouteHandler<GetTasksDataRoute> = async ({
  json,
  get,
}) => {
  const db = get("db");

  const response = await db
    .select({
      status: tasks.completed,
      value: count(),
    })
    .from(tasks)
    .groupBy(tasks.completed);

  const data = response.map((task, index) => {
    return {
      label: task.status ? "completed" : "not-completed",
      value: task.value,
      fill: `var(--color-chart-${index + 1})`,
    };
  });

  return json(data, HTTPStatusCodes.OK);
};

export const getTasksCountDataHandler: AppRouteHandler<
  GetTasksCountDataRoute
> = async ({ json, get, req }) => {
  const db = get("db");
  const { completed } = req.valid("query");
  const [response] = await db
    .select({ count: count() })
    .from(tasks)
    .where(
      completed !== undefined ? eq(tasks.completed, completed) : undefined,
    );

  return json(response, HTTPStatusCodes.OK);
};
