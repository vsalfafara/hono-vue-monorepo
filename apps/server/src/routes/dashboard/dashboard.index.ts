import { createRouter } from "@/server/lib/create-app";
import * as handlers from "./dashboard.handlers";
import * as routes from "./dashboard.routes";

const router = createRouter()
  .openapi(routes.getTasksDataRoute, handlers.getTaskDataHandler)
  .openapi(routes.getTasksCountDataRoute, handlers.getTasksCountDataHandler);

export default router;
