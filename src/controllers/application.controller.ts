import { FastifyReply, FastifyRequest } from "fastify";

import { createApplicationRequestType } from "@/db/schemas/application.schema";
import { createApplication } from "@/services/application.service";

export async function createApplicationHandler(
	req: FastifyRequest<{ Body: createApplicationRequestType }>,
	res: FastifyReply,
) {
	const { name } = req.body;

	const application = await createApplication({ name });

	return res.send({ application });
}
