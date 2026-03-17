import { HTTPStatusCodes, IdParamsSchema } from "@/server/lib/helpers";
import { authMiddleware } from "@/server/middlewares/auth.middleware";
import { createRoute, z } from "@hono/zod-openapi";
import {
  selectTaskSchema,
  insertTaskSchema,
  updateTaskSchema,
} from "@packages/db/validators";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {
  createErrorSchema,
  createMessageObjectSchema,
} from "stoker/openapi/schemas";

const tags = ["Tasks"];

export const listTasksRoute = createRoute({
  tags,
  summary: "Get All Tasks",
  description: "Get all tasks of authenticated user",
  middleware: [authMiddleware()],
  path: "/tasks",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.array(selectTaskSchema),
      "List of tasks",
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export const getTaskRoute = createRoute({
  tags,
  summary: "Get Specific Task",
  description: "Get specific task of authenticated user",
  middleware: [authMiddleware()],
  path: "/tasks/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectTaskSchema, "Requested Task"),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Task not found"),
      "Task not found",
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Task not found",
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export const createTaskRoute = createRoute({
  tags,
  summary: "Create Task",
  description: "Create new task of authenticated user",
  middleware: [authMiddleware()],
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(insertTaskSchema, "New Task"),
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectTaskSchema, "New Task"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTaskSchema),
      "Validation Error",
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export const updateTaskRoute = createRoute({
  tags,
  summary: "Update Task",
  description: "Update existing task of authenticated user",
  middleware: [authMiddleware()],
  path: "/tasks/{id}",
  method: "put",
  request: {
    params: IdParamsSchema,
    body: jsonContent(updateTaskSchema, "Task to update"),
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectTaskSchema, "Task updated"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(updateTaskSchema),
      "Validation errors",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Task not found"),
      "Task not found",
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export const completeTaskRoute = createRoute({
  tags,
  summary: "Complete Task",
  description: "Change status of task of authenticated user to completed",
  middleware: [authMiddleware()],
  path: "/tasks/{id}/complete",
  method: "put",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(selectTaskSchema, "Task updated"),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Task not found"),
      "Task not found",
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export const deleteTaskRoute = createRoute({
  tags,
  summary: "Delete Task",
  description: "Delete existing task of authenticated user",
  middleware: [authMiddleware()],
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Task Deleted"),
      "Task deleted",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Task not found"),
      "Task not found",
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export type ListTasksRoute = typeof listTasksRoute;
export type GetTaskRoute = typeof getTaskRoute;
export type CreateTaskRoute = typeof createTaskRoute;
export type UpdateTaskRoute = typeof updateTaskRoute;
export type CompleteTaskRoute = typeof completeTaskRoute;
export type DeleteTaskRoute = typeof deleteTaskRoute;
