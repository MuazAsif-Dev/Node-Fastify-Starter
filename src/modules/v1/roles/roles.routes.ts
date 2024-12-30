import type { FastifyInstance } from "fastify";

import { createRoleHandler } from "./roles.controller.js";
import { createRoleJsonSchema } from "./roles.schema.js";

export default async function roleRouter(router: FastifyInstance) {
	router.post("/", { schema: createRoleJsonSchema }, createRoleHandler);
}
