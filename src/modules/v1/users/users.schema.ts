import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { users } from "@/db/models/users.model";
import { usersToRoles } from "@/db/models/usersToRoles.model";

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

const selectUserTableSchema = createSelectSchema(users, {
	email: (schema) => schema.email.email(),
	applicationId: (schema) => schema.applicationId.uuid(),
	password: (schema) => schema.password.min(6),
});

const loginUserApiValidatorSchema = selectUserTableSchema.pick({
	applicationId: true,
	email: true,
	password: true,
});

export type loginUserRequestBodyType = z.infer<
	typeof loginUserApiValidatorSchema
>;

export const loginUserJsonSchema = {
	body: zodToJsonSchema(
		loginUserApiValidatorSchema,
		"loginUserApiValidatorSchema",
	),
};

const createUserToRolesTableSchema = createInsertSchema(usersToRoles, {
	userId: z.string().uuid(),
	applicationId: z.string().uuid(),
	roleId: z.string().uuid(),
});

export type createUserToRolesRequestBodyType = z.infer<
	typeof createUserToRolesTableSchema
>;

export const createUserToRolesJsonSchema = {
	body: zodToJsonSchema(
		createUserToRolesTableSchema,
		"createUserToRolesTableSchema",
	),
};
