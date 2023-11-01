import { InferInsertModel } from "drizzle-orm";

import { db } from "@/db/dbConnection";
import { roles } from "@/db/models/roles.model";

export async function createRole(data: InferInsertModel<typeof roles>) {
	const result = await db.insert(roles).values(data).returning();

	return result[0];
}
