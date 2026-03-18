import { AppOpenAPI } from "@/server/lib/types";
import { BASE_PATH } from "@/server/lib/constants";
import health from "./health/health.index";
import tasks from "./tasks/tasks.index";
import users from "./users/users.index";
import dashboard from "./dashboard/dashboard.index";

export function configureRoutes(app: AppOpenAPI) {
  const routes = [health, tasks, users, dashboard];
  routes.forEach((route) => {
    app.route(BASE_PATH, route);
  });
  return app;
}
