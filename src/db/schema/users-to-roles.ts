import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { applications } from "./applications.js";
import { roles } from "./roles.js";
import { users } from "./users.js";

export const usersToRoles = pgTable(
	"usersToRoles",
	{
		applicationId: uuid("applicationId")
			.references(() => applications.id)
			.notNull(),
		userId: uuid("userId")
			.references(() => users.id)
			.notNull(),
		roleId: uuid("roleId")
			.references(() => roles.id)
			.notNull(),

		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(usersToRoles) => [
		primaryKey({
			columns: [
				usersToRoles.applicationId,
				usersToRoles.userId,
				usersToRoles.roleId,
			],
		}),
	],
);
