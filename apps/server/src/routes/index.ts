import { createRouter } from "../lib/create-app";
import type { AppOpenAPI } from "../lib/types";
import { BASE_PATH } from "../lib/constants";
import users from "./users/users.index";
import tasks from "./tasks/tasks.index";

export function registerRoutes(app: AppOpenAPI) {
  return app.route("/", users).route("/", tasks);
}

const router = registerRoutes(createRouter().basePath(BASE_PATH));
export type Router = typeof router;
