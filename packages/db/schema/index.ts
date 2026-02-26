import { text, boolean, uuid, varchar, pgSchema } from "drizzle-orm/pg-core";
import { getIdColumn, getTimestampsColumns } from "../src/utils";
import { organization, user } from "./auth-schema";
import { relations } from "drizzle-orm";

// Export everything from auth-schema to include them for generating migrations
export * from "./auth-schema";

export const dataSchema = pgSchema("data");

const { table } = dataSchema;

export const queueItem = table("queue_item", {
  ...getIdColumn(),
  serviceId: uuid("service_id").references(() => service.id, {
    onDelete: "set null",
  }),
  organizationId: text("organization_id").references(() => organization.id, {
    onDelete: "set null",
  }),
  queued: boolean("queued").default(false),
  done: boolean("done").notNull().default(false),
  servedBy: text("served_by").references(() => user.id, {
    onDelete: "set null",
  }),
  noShow: boolean("no_show").default(false),
  ...getTimestampsColumns(),
});

export const service = table("service", {
  ...getIdColumn(),
  name: varchar("name", { length: 255 }),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  createdBy: text("created_by").references(() => user.id, {
    onDelete: "set null",
  }),
  ...getTimestampsColumns(),
});

export const queueItemRelations = relations(queueItem, ({ one }) => ({
  organization: one(organization, {
    fields: [queueItem.organizationId],
    references: [organization.id],
  }),
  service: one(service, {
    fields: [queueItem.serviceId],
    references: [service.id],
  }),
}));
