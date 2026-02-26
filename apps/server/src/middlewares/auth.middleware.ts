import { AppBindings } from "@/server/lib/types";
import { auth, Permission } from "@packages/auth";
import { createMiddleware } from "hono/factory";
import { HTTPStatusCodes } from "@/server/lib/helpers";

export function authMiddleware() {
  return createMiddleware<AppBindings>(async (c, next) => {
    try {
      const authInstance = auth(c.env);
      const session = await authInstance.api.getSession({
        headers: c.req.raw.headers,
      });

      if (!session)
        return c.json(
          { message: "Unauthorized" },
          HTTPStatusCodes.UNAUTHORIZED,
        );

      c.set("user", session.user);
      c.set("session", session.session);

      return next();
    } catch (error) {
      const errorMessage = `Error in auth middleware: ${error}`;
      console.error(errorMessage);
      return c.json(
        { message: errorMessage },
        HTTPStatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  });
}

export function adminMiddleware(permissions: Permission) {
  return createMiddleware<AppBindings>(async (c, next) => {
    try {
      const authInstance = auth(c.env);
      const { id } = c.var.user;

      const { success } = await authInstance.api.userHasPermission({
        body: {
          userId: id,
          permissions,
        },
      });

      if (!success)
        return c.json(
          { message: "Unauthorized" },
          HTTPStatusCodes.UNAUTHORIZED,
        );

      return next();
    } catch (error) {
      const errorMessage = `Error in admin middleware: ${error}`;
      console.error(errorMessage);
      return c.json(
        { message: errorMessage },
        HTTPStatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  });
}
