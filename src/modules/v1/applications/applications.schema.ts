import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { applications } from "@/db/schema/applications";

const createApplicationApiValidatorSchema = createInsertSchema(
	applications,
).pick({ name: true });

export type createApplicationRequestBodyType = z.infer<
	typeof createApplicationApiValidatorSchema
>;

export const createApplicationJsonSchema = {
	body: zodToJsonSchema(
		createApplicationApiValidatorSchema,
		"createApplicationApiValidatorSchema",
	),
};
