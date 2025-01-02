import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

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
				params: z.object({
					userId: z.string(),
				}),
			},
		},
		async (req) => {
			const { userId } = req.params;
			return { userId };
		},
	);
}
