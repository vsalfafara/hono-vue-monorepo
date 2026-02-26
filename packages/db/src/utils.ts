import { timestamp, uuid } from "drizzle-orm/pg-core";

export function getIdColumn() {
  return {
    id: uuid("id").primaryKey().defaultRandom(),
  };
}

export function getTimestampsColumns() {
  return {
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  };
}
