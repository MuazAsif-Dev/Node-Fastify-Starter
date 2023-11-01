import {
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

import { applications } from "./applications.model";

export const roles = pgTable(
	"roles",
	{
		id: uuid("id").defaultRandom().notNull(),
		name: varchar("name", { length: 256 }).notNull(),
		applicationId: uuid("applicationId")
			.references(() => applications.id)
			.notNull(),
		permissions: text("permissions").array().$type<Array<string>>(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(roles) => {
		return {
			cpk: primaryKey(roles.name, roles.applicationId),
			idIndex: uniqueIndex("roles_id_index").on(roles.id),
		};
	},
);
