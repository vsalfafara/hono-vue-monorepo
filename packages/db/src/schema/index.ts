import { relations } from "drizzle-orm";
import { text, boolean, pgSchema, varchar } from "drizzle-orm/pg-core";
import { getIdColumn, getTimestampsColumns } from "../utils";
import { user } from "./auth-schema";

// Export everything from auth-schema to include them for generating migrations
export * from "./auth-schema";

export const dataSchema = pgSchema("data");

const { table } = dataSchema;

export const tasks = table("tasks", {
  ...getIdColumn(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 50 }).notNull(),
  description: text("description"),
  completed: boolean("completed").default(false),
  ...getTimestampsColumns(),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  user: one(user, {
    fields: [tasks.id],
    references: [user.id],
  }),
}));
