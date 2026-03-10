import { AppRouteHandler } from "@/server/lib/types";
import { CheckHealthRoute } from "./health.routes";
import { HTTPStatusCodes } from "@/server/lib/helpers";

export const checkHealthHandler: AppRouteHandler<CheckHealthRoute> = async ({
  json,
}) => {
  return json({ message: "ok" }, HTTPStatusCodes.OK);
};
