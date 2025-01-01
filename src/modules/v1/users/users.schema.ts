// import { createInsertSchema, createSelectSchema } from "drizzle-zod";
// import { z } from "zod";

// import { usersToRoles } from "@/db/schema/users-to-roles.js";
// import { users } from "@/db/schema/users.js";
// import { zodToJsonSchema } from "zod-to-json-schema";

// const createUserTableSchema = createInsertSchema(users, {
// 	email: (schema) => schema.email(),
// 	applicationId: (schema) => schema.uuid(),
// 	password: (schema) => schema.min(6),
// });

// const createUserApiValidatorSchema = createUserTableSchema.extend({
// 	initalUser: z.boolean().optional(),
// });

// export type createUserRequestBodyType = z.infer<
// 	typeof createUserApiValidatorSchema
// >;

// export const createUserJsonSchema = {
// 	tags: ["users"],
// 	body: zodToJsonSchema(
// 		createUserApiValidatorSchema,
// 		"createUserApiValidatorSchema",
// 	),
// };

// const selectUserTableSchema = createSelectSchema(users, {
// 	email: (schema) => schema.email(),
// 	applicationId: (schema) => schema.uuid(),
// 	password: (schema) => schema.min(6),
// });

// const loginUserApiValidatorSchema = selectUserTableSchema.pick({
// 	applicationId: true,
// 	email: true,
// 	password: true,
// });

// export type loginUserRequestBodyType = z.infer<
// 	typeof loginUserApiValidatorSchema
// >;

// export const loginUserJsonSchema = {
// 	tags: ["users"],
// 	body: zodToJsonSchema(
// 		loginUserApiValidatorSchema,
// 		"loginUserApiValidatorSchema",
// 	),
// };

// const createUserToRolesTableSchema = createInsertSchema(usersToRoles, {
// 	userId: z.string().uuid(),
// 	applicationId: z.string().uuid(),
// 	roleId: z.string().uuid(),
// });

// export type createUserToRolesRequestBodyType = z.infer<
// 	typeof createUserToRolesTableSchema
// >;

// export const createUserToRolesJsonSchema = {
// 	tags: ["users"],
// 	body: zodToJsonSchema(
// 		createUserToRolesTableSchema,
// 		"createUserToRolesTableSchema",
// 	),
// };
