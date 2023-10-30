import type { FastifyInstance } from "fastify";

import applicationRouter from "./application.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api is running" };
	});

	router.register(authRouter, { prefix: "/api/auth" });
	router.register(applicationRouter, { prefix: "/api/application" });
	router.register(userRouter, { prefix: "/api/user" });
}
