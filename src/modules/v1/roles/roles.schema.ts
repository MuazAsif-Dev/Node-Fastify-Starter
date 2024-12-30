import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { ALL_PERMISSIONS } from "@/config/data/permissions.js";
import { roles } from "@/db/schema/roles.js";

const roleInsertSchema = createInsertSchema(roles);

const createRoleApiValidatorSchema = roleInsertSchema
	.extend({
		permissions: z.array(z.enum(ALL_PERMISSIONS)),
		applicationId: z.string().uuid(),
	})
	.pick({
		name: true,
		permissions: true,
		applicationId: true,
	});

export type createRoleRequestBodyType = z.infer<
	typeof createRoleApiValidatorSchema
>;

export const createRoleJsonSchema = {
	body: zodToJsonSchema(
		createRoleApiValidatorSchema,
		"createRoleApiValidatorSchema",
	),
};
