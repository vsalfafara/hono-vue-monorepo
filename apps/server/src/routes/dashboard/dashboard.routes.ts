import { HTTPStatusCodes } from "@/server/lib/helpers";
import {
  adminMiddleware,
  authMiddleware,
} from "@/server/middlewares/auth.middleware";
import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import z from "zod";

const tags = ["Dashboard"];

const taskDashboardData = z.array(
  z.object({
    label: z.string(),
    value: z.number(),
    fill: z.string(),
  }),
);

const tasksCount = z.object({
  count: z.number(),
});

const tasksCountStatusParams = z.object({
  completed: z.preprocess((val) => val === "true", z.boolean()).optional(),
});

export const getTasksDataRoute = createRoute({
  tags,
  summary: "Get Task Dashboard Data",
  description: "Get task dashboard data by status",
  middleware: [authMiddleware(), adminMiddleware({ dashboard: ["read"] })],
  path: "/dashboard",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(taskDashboardData, "Dashboard Data"),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export const getTasksCountDataRoute = createRoute({
  tags,
  summary: "Get Tasks Count",
  description: "Get total number of tasks",
  middleware: [authMiddleware(), adminMiddleware({ dashboard: ["read"] })],
  path: "/dashboard/tasks-count",
  method: "get",
  request: {
    query: tasksCountStatusParams,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(tasksCount, "Tasks Count"),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export type GetTasksDataRoute = typeof getTasksDataRoute;
export type GetTasksCountDataRoute = typeof getTasksCountDataRoute;
