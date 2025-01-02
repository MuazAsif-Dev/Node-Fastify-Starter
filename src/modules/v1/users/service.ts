import { db } from "@/db/index.js";
import { user } from "@/db/schema/index.js";
import { eq } from "drizzle-orm";

export async function getUserById(id: string) {
	const result = await db.select().from(user).where(eq(user.id, id));

	return result;
}
