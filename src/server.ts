import Fastify from "fastify";

import { env } from "./config/env.js";
import { loggerConfig } from "./config/logger.js";
import router from "./routes/index.js";

export async function createServer() {
	const app = Fastify({
		logger: env.NODE_ENV ? loggerConfig[env.NODE_ENV] : true,
	});

	app.register(router);

	return app;
}
