import type { FastifyInstance } from "fastify";

import { createRoleHandler } from "./roles.controller";
import { createRoleJsonSchema } from "./roles.schema";

export default async function roleRouter(router: FastifyInstance) {
	router.post("/", { schema: createRoleJsonSchema }, createRoleHandler);
}
