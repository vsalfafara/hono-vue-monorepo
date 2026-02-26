import { AppOpenAPI } from "@/server/lib/types";
import { BASE_PATH } from "@/server/lib/constants";
import users from "./users/users.index";

export function configureRoutes(app: AppOpenAPI) {
  const routes = [users];
  routes.forEach((route) => {
    app.route(BASE_PATH, route);
  });
  return app;
}
