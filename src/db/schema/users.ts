import {
	pgTable,
	primaryKey,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

import { applications } from "./applications";

export const users = pgTable(
	"users",
	{
		id: uuid("id").defaultRandom().notNull().unique(),
		email: varchar("email", { length: 256 }).notNull(),
		name: varchar("name", { length: 256 }).notNull(),
		applicationId: uuid("applicationId")
			.references(() => applications.id)
			.notNull(),
		password: varchar("password", { length: 256 }).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(users) => [
		primaryKey({ columns: [users.email, users.applicationId] }),
		uniqueIndex("users_id_index").on(users.id),
	],
);
