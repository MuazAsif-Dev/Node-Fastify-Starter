import * as argon2 from "argon2";
import { eq, InferInsertModel } from "drizzle-orm";

import { db } from "@/db/dbConnection";
import { users } from "@/db/models/users.model";
import { usersToRoles } from "@/db/models/usersToRoles.model";

export async function createUser(data: InferInsertModel<typeof users>) {
	const hashedPassword = await argon2.hash(data.password);

	const result = await db
		.insert(users)
		.values({
			...data,
			password: hashedPassword,
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

export async function getUsersByApplicationId(applicationId: string) {
	const result = await db
		.select()
		.from(users)
		.where(eq(users.applicationId, applicationId));

	return result;
}

export async function assignRoleToUser(
	data: InferInsertModel<typeof usersToRoles>,
) {
	const result = await db.insert(usersToRoles).values(data).returning();

	return result[0];
}
