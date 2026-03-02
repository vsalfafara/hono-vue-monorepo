import { createRouter } from "./lib/create-app";
import { configureOpenApi } from "./lib/open-api";
import { configureMiddlewares } from "./middlewares/index.middleware";
import { configureAuth } from "./auth/auth";
import { configureRoutes } from "./routes/index.routes";
import { configurePublic } from "./lib/public";

const app = createRouter();

configureOpenApi(app);
configureMiddlewares(app);
configureAuth(app);
configureRoutes(app);
configurePublic(app);

export default app;
