import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";

import { env } from "@/config/env";
import { loggerConfig } from "@/config/logger";
import router from "@/modules/v1/routes";

export async function createServer() {
	const app = Fastify({
		logger: env.NODE_ENV ? loggerConfig[env.NODE_ENV] : true,
	});

	app.register(helmet);
	app.register(rateLimit, {
		max: 60,
		timeWindow: 60 * 1000,
	});

	app.register(router, { prefix: "/api/v1" });

	return app;
}
