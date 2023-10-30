import type { FastifyInstance } from "fastify";

import { createApplicationHandler } from "@/controllers/application.controller";
import { createApplicationJsonSchema } from "@/db/schemas/application.schema";

export default async function applicationRouter(router: FastifyInstance) {
	router.post(
		"/",
		{ schema: createApplicationJsonSchema },
		createApplicationHandler,
	);

	router.get("/", () => {});
}
