import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import Fastify from "fastify";

import { env } from "@/config/env.js";
import { loggerConfig } from "@/config/logger.js";
import { OpenAPIConfig } from "@/config/openapi.js";
import router from "@/modules/v1/routes.js";
import { fastifyBetterAuthPlugin } from "@/plugins/better-auth.js";

export async function createServer() {
	const app = Fastify({
		logger: loggerConfig[env.NODE_ENV],
	});

	app.register(cors, {});

	app.register(fastifyBetterAuthPlugin);

	// app.register(helmet);
	app.register(rateLimit, {
		max: 60,
		timeWindow: 60 * 1000,
	});

	app.register(jwt, { secret: env.JWT_SECRET_KEY });

	app.register(fastifySwagger, OpenAPIConfig);

	app.register(router, { prefix: "/api/v1" });

	app.register(ScalarApiReference, {
		routePrefix: "/docs",
	});

	await app.ready();

	return app;
}
