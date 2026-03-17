import { user } from "@packages/db/schema";

export type User = typeof user.$inferSelect;
