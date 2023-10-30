import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const applications = pgTable("applications", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 256 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

const createApplicationApiValidatorSchema = createInsertSchema(
	applications,
).pick({ name: true });

export type createApplicationRequestType = z.infer<
	typeof createApplicationApiValidatorSchema
>;

export const createApplicationJsonSchema = {
	body: zodToJsonSchema(
		createApplicationApiValidatorSchema,
		"createApplicationApiValidatorSchema",
	),
};
