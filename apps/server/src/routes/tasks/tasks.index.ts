import { createRouter } from "../../lib/create-app";
import * as handlers from "./tasks.handlers";
import * as routes from "./tasks.routes";

const router = createRouter()
  .openapi(routes.listTasksRoute, handlers.listTasksHandler)
  .openapi(routes.getTaskRoute, handlers.getTaskHandler)
  .openapi(routes.createTaskRoute, handlers.createTaskHandler)
  .openapi(routes.updateTaskRoute, handlers.updateTaskHandler);

export default router;
