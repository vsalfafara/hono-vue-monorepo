import createApp from "./lib/create-app";
import configureOpenApi from "./lib/open-api";
import configureMiddlewares from "./middlewares/index.middleware";
import { configureAuth } from "./auth/auth";
import { configureRoutes } from "./routes/index.routes";

const app = createApp();

configureOpenApi(app);
configureMiddlewares(app);
configureAuth(app);
configureRoutes(app);

export default app;
