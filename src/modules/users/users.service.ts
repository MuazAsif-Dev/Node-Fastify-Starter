import { InferInsertModel } from "drizzle-orm";

import { db } from "@/db/dbConnection";
import { users } from "@/db/models/users.model";

export async function createUser(data: InferInsertModel<typeof users>) {
	const result = await db
		.insert(users)
		.values({
			...data,
		})
		.returning({
			id: users.id,
			email: users.email,
			name: users.name,
			applicationId: users.applicationId,
			createdAt: users.createdAt,
		});

	return result[0];
}
