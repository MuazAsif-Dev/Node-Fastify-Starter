import type { FastifyInstance } from "fastify";

import applicationRouter from "@/modules/application/application.route";
import authRouter from "@/modules/auth/auth.route";
import userRouter from "@/modules/user/user.route";

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api is running" };
	});

	router.register(authRouter, { prefix: "/api/auth" });
	router.register(applicationRouter, { prefix: "/api/application" });
	router.register(userRouter, { prefix: "/api/user" });
}
