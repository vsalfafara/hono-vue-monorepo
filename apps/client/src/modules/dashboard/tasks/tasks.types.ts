import type { tasks } from "@packages/db/schema";

export type Task = typeof tasks.$inferSelect;

export type NewTask = Pick<typeof tasks.$inferInsert, "title" | "description">;
