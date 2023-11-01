import { FastifyReply, FastifyRequest } from "fastify";

import { createApplicationRequestType } from "./application.schema";
import { createApplication } from "./application.service";

export async function createApplicationHandler(
	req: FastifyRequest<{ Body: createApplicationRequestType }>,
	res: FastifyReply,
) {
	const { name } = req.body;

	const application = await createApplication({ name });

	return res.status(200).send({ application });
}
