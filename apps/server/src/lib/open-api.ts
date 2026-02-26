import type { AppOpenAPI } from "./types";
import packageJSON from "../../package.json";
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenApi(app: AppOpenAPI) {
  const { version, meta } = packageJSON;

  app.doc("/doc", {
    openapi: "3.2.0",
    info: {
      version,
      title: "Hono API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      pageTitle: `${meta} API Reference`,
      sources: [
        {
          url: "/doc",
          title: `${meta} API Documentation`,
        },
        {
          url: "/api/auth/open-api/generate-schema",
          title: `${meta} Auth Documentation`,
        },
      ],
    }),
  );
}
