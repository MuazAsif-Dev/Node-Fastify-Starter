import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { users } from "@/db/models/users.model";

const createUserTableSchema = createInsertSchema(users, {
	email: (schema) => schema.email.email(),
	applicationId: (schema) => schema.applicationId.uuid(),
	password: (schema) => schema.password.min(6),
});

const createUserApiValidatorSchema = createUserTableSchema.extend({
	initalUser: z.boolean().optional(),
});

export type createUserRequestBodyType = z.infer<
	typeof createUserApiValidatorSchema
>;

export const createUserJsonSchema = {
	body: zodToJsonSchema(
		createUserApiValidatorSchema,
		"createUserApiValidatorSchema",
	),
};
