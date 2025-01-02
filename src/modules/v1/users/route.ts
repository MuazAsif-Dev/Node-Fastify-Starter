import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { getUserByIdHandler, getUserByIdSchema } from "./get-user-by-id.js";

export default async function userRouter(router: FastifyInstance) {
	const typedRouter = router.withTypeProvider<ZodTypeProvider>();
	typedRouter.get(
		"/",
		{
			schema: {
				tags: ["User"],
			},
		},
		() => {
			return "User Routes";
		},
	);

	typedRouter.get(
		"/:userId",
		{
			schema: {
				tags: ["User"],
				...getUserByIdSchema,
			},
		},
		getUserByIdHandler,
	);
}
