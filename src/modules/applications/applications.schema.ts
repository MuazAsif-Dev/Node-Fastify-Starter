import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { applications } from "@/db/models/applications.model";

const createApplicationApiValidatorSchema = createInsertSchema(
	applications,
).pick({ name: true });

export type createApplicationRequestType = z.infer<
	typeof createApplicationApiValidatorSchema
>;

export const createApplicationJsonSchema = {
	body: zodToJsonSchema(
		createApplicationApiValidatorSchema,
		"createApplicationApiValidatorSchema",
	),
};
