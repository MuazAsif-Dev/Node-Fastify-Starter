import type { FastifyInstance } from "fastify";

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api v1 is running" };
	});

	router.get("/openapi.json", async () => {
		return router.swagger();
	});

	// router.register(authRouter);

	// router.register(userRouter, { prefix: "/user" });
}
