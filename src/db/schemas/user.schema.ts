import {
	pgTable,
	primaryKey,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

import { applications } from "./application.schema";

export const user = pgTable(
	"users",
	{
		id: uuid("id").defaultRandom().notNull(),
		email: varchar("email", { length: 256 }).notNull(),
		name: varchar("name", { length: 256 }).notNull(),
		applicationId: uuid("applicationId").references(() => applications.id),
		password: varchar("password", { length: 256 }).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(users) => {
		return {
			cpk: primaryKey(users.email, users.applicationId),
			idIndex: uniqueIndex("users_id_index").on(users.id),
		};
	},
);
