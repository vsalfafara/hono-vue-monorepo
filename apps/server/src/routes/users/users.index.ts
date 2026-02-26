import { createRouter } from "../../lib/create-app";
import * as handlers from "./users.handlers";
import * as routes from "./users.routes";

const router = createRouter()
  .openapi(routes.listUsersRoute, handlers.listUsersHandler)
  .openapi(routes.getUserRoute, handlers.getUserHandler);

export default router;
