import FastifySwagger, {
	type FastifyDynamicSwaggerOptions,
} from "@fastify/swagger";

import packageJson from "#/package.json" with { type: "json" };

export const OpenAPIConfig = {
	openapi: {
		info: {
			title: "My Fastify App",
			version: packageJson.version,
		},
		components: {
			securitySchemes: {
				apiKey: {
					type: "apiKey",
					name: "apiKey",
					in: "header",
				},
			},
		},
	},
} as FastifyDynamicSwaggerOptions;
