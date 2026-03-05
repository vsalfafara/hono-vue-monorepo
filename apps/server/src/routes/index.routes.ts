import { AppOpenAPI } from "@/server/lib/types";
import { BASE_PATH } from "@/server/lib/constants";
import tasks from "./tasks/tasks.index";
import users from "./users/users.index";

export function configureRoutes(app: AppOpenAPI) {
  const routes = [users, tasks];
  routes.forEach((route) => {
    app.route(BASE_PATH, route);
  });
  return app;
}
