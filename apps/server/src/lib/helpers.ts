import { z } from "zod";
import { NOT_FOUND } from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export * as HTTPStatusCodes from "stoker/http-status-codes";
export * as HTTPStatusPhrases from "stoker/http-status-phrases";
export const UuidParamsSchema = z.object({ id: z.string() });
export const IdParamsSchema = z.object({ id: z.string() });
export const notFoundSchema = (message: string | null = null) => {
  return createMessageObjectSchema(message || NOT_FOUND);
};
