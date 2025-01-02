import FastifySwagger, {
	type FastifyDynamicSwaggerOptions,
} from "@fastify/swagger";

import { auth } from "@/config/auth.js";
import * as schema from "@/db/schema/index.js";
import { createInsertSchema } from "drizzle-zod";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import packageJson from "#/package.json" with { type: "json" };

const openAPISchema = await auth.api.generateOpenAPISchema();

export const OpenAPIConfig = {
	openapi: {
		info: {
			title: "My Fastify App",
			description: "API Reference for my Fastify App",
			version: packageJson.version,
		},
		components: {
			schemas: {
				User: zodToJsonSchema(createInsertSchema(schema.user)),
				Session: zodToJsonSchema(createInsertSchema(schema.session)),
				Account: zodToJsonSchema(createInsertSchema(schema.account)),
				Verification: zodToJsonSchema(createInsertSchema(schema.verification)),
			},
		},
		// servers: [{ url: "http://localhost:8000/api/v1" }],
		paths: Object.entries(openAPISchema.paths).reduce(
			(acc, [path, methods]) => {
				const updatedMethods = Object.fromEntries(
					Object.entries(methods).map(([method, config]) => [
						method,
						{ ...config, tags: ["Auth"] },
					]),
				);

				// acc[`/auth${path}`] = updatedMethods;
				acc[`/api/v1/auth${path}`] = updatedMethods;

				return acc;
			},
			{} as Record<string, unknown>,
		),
	},
	transform: jsonSchemaTransform,
} as FastifyDynamicSwaggerOptions;
