import { AppOpenAPI } from "@/server/lib/types";
import { auth } from "@packages/auth";

export function configureAuth(app: AppOpenAPI) {
  app.on(["get", "post"], ["/api/auth/*"], async (c) => {
    const authInstance = auth(c.env);
    return authInstance.handler(c.req.raw);
  });
}
