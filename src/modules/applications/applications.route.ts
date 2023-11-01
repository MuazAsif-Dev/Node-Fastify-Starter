import type { FastifyInstance } from "fastify";

import {
	createApplicationHandler,
	getApplicationsHandler,
} from "./applications.controller";
import { createApplicationJsonSchema } from "./applications.schema";

export default async function applicationRouter(router: FastifyInstance) {
	router.post(
		"/",
		{ schema: createApplicationJsonSchema },
		createApplicationHandler,
	);

	router.get("/", getApplicationsHandler);
}
