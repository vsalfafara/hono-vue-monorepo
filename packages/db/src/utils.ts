import { sql } from "drizzle-orm";
import { timestamp, text } from "drizzle-orm/pg-core";

export function getIdColumn() {
  return {
    // Using text instead of uuid because of typescript errors
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()::text`),
  };
}

export function getTimestampsColumns() {
  return {
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date().toLocaleDateString())
      .notNull(),
  };
}
