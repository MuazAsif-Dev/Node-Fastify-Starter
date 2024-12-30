import type { FastifyReply, FastifyRequest } from "fastify";

import type { createRoleRequestBodyType } from "./roles.schema.js";
import { createRole } from "./roles.service.js";

export async function createRoleHandler(
	req: FastifyRequest<{ Body: createRoleRequestBodyType }>,
	res: FastifyReply,
) {
	const { name, permissions, applicationId } = req.body;

	const role = await createRole({ name, permissions, applicationId });

	res.code(201);

	return role;
}
