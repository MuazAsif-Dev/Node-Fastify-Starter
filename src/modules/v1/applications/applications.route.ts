import type { FastifyInstance } from "fastify";

import {
	createApplicationHandler,
	getApplicationsHandler,
} from "./applications.controller.js";
import { createApplicationJsonSchema } from "./applications.schema.js";

export default async function applicationRouter(router: FastifyInstance) {
	router.post(
		"/",
		{ schema: createApplicationJsonSchema },
		createApplicationHandler,
	);

	router.get(
		"/",
		{
			schema: {
				tags: ["application"],
			},
		},
		getApplicationsHandler,
	);
}
