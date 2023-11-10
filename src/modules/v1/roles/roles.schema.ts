import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { ALL_PERMISSIONS } from "@/config/data/permissions";
import { roles } from "@/db/models/roles.model";

const createRoleApiValidatorSchema = createInsertSchema(roles, {
	permissions: z.array(z.enum(ALL_PERMISSIONS)),
	applicationId: (schema) => schema.applicationId.uuid(),
}).pick({ name: true, permissions: true, applicationId: true });

export type createRoleRequestBodyType = z.infer<
	typeof createRoleApiValidatorSchema
>;

export const createRoleJsonSchema = {
	body: zodToJsonSchema(
		createRoleApiValidatorSchema,
		"createRoleApiValidatorSchema",
	),
};
