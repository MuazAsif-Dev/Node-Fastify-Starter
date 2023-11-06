import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";

import { env } from "@/config/env";
import { loggerConfig } from "@/config/logger";
import router from "@/modules/v1/routes";

export async function createServer() {
	const app = Fastify({
		logger: env.NODE_ENV ? loggerConfig[env.NODE_ENV] : true,
	});

	app.register(cors, {});

	app.register(helmet);
	app.register(rateLimit, {
		max: 60,
		timeWindow: 60 * 1000,
	});

	app.register(fastifyJwt, { secret: env.JWT_SECRET_KEY });

	app.register(router, { prefix: "/api/v1" });

	return app;
}
