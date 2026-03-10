import { createRouter } from "@/server/lib/create-app";
import * as handlers from "./health.handlers";
import * as routes from "./health.routes";

const router = createRouter().openapi(
  routes.checkHealthRoute,
  handlers.checkHealthHandler,
);

export default router;
