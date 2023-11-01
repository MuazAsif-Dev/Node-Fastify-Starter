import type { FastifyInstance } from "fastify";

import { createApplicationHandler } from "./application.controller";
import { createApplicationJsonSchema } from "./application.schema";

export default async function applicationRouter(router: FastifyInstance) {
	router.post(
		"/",
		{ schema: createApplicationJsonSchema },
		createApplicationHandler,
	);

	router.get("/", () => {});
}
