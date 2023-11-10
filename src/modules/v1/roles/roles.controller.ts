import { FastifyReply, FastifyRequest } from "fastify";

import { createRoleRequestBodyType } from "./roles.schema";
import { createRole } from "./roles.service";

export async function createRoleHandler(
	req: FastifyRequest<{ Body: createRoleRequestBodyType }>,
	res: FastifyReply,
) {
	const { name, permissions, applicationId } = req.body;

	const role = await createRole({ name, permissions, applicationId });

	res.code(201);

	return role;
}
