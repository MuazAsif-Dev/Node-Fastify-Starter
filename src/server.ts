import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";

import { env } from "@/config/env.js";
import { loggerConfig } from "@/config/logger.js";
import router from "@/modules/v1/routes.js";
import { fastifyBetterAuthPlugin } from "@/plugins/better-auth.js";
import { ScalarOpenApiDocsPlugin } from "@/plugins/scalar-docs.js";
import {
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { serializerCompiler } from "fastify-type-provider-zod";

export async function createServer() {
	const app = Fastify({
		logger: loggerConfig[env.NODE_ENV],
	});

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(cors, {});

	// app.register(helmet);
	app.register(rateLimit, {
		max: 60,
		timeWindow: 60 * 1000,
	});

	app.register(fastifyBetterAuthPlugin);

	app.register(ScalarOpenApiDocsPlugin);

	app.register(router, { prefix: "/api/v1" });

	app.register((fastify) => {
		fastify.get("/openapi.json", async () => {
			return fastify.swagger();
		});

		fastify.get("/healthcheck", async () => {
			return { message: "Server is running" };
		});
	});

	app.setErrorHandler(async (err, req, res) => {
		app.log.error({ err });

		if (hasZodFastifySchemaValidationErrors(err)) {
			return res.code(400).send({
				error: "Response Validation Error",
				message: "Request doesn't match the schema",
				statusCode: 400,
				details: {
					issues: err.validation,
					method: req.method,
					url: req.url,
				},
			});
		}

		if (isResponseSerializationError(err)) {
			return res.code(500).send({
				error: "Internal Server Error",
				message: "Response doesn't match the schema",
				statusCode: 500,
				details: {
					issues: err.cause.issues,
					method: err.method,
					url: err.url,
				},
			});
		}

		res.status(err.statusCode || 500);

		return { message: "An error has occured" };
	});

	await app.ready();

	return app;
}
