import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getUserById } from "./service.js";

export const getUserByIdSchema = z.object({
	Params: z.object({
		userId: z.string(),
	}),
	Querystring: z.object({
		page: z.number().optional(),
		limit: z.number().optional(),
	}),
});

export type GetUserByIdSchemaType = z.infer<typeof getUserByIdSchema>;

export async function getUserByIdHandler(
	req: FastifyRequest<GetUserByIdSchemaType>,
	res: FastifyReply,
) {
	const { userId } = req.params;
	const { page, limit } = req.query;
	try {
		const user = getUserById(userId);
		res.send({ user });
	} catch (error) {
		return error;
	}
}
