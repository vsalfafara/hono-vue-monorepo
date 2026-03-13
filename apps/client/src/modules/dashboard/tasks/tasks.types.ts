import type { tasks } from "@packages/db/schema";

export type Tasks = typeof tasks.$inferSelect;
