import { OpenAPIConfig } from "@/config/openapi.js";
import fastifySwagger from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const ScalarOpenApiDocsPlugin = fp(
	async (fastify: FastifyInstance): Promise<void> => {
		fastify.register(fastifySwagger, OpenAPIConfig);

		fastify.register(ScalarApiReference, {
			routePrefix: "/docs",
			configuration: {
				theme: "saturn",
				defaultHttpClient: {
					targetKey: "node",
					clientKey: "fetch",
				},
			},
		});
	},
	{
		name: "scalar-docs-plugin",
	},
);
