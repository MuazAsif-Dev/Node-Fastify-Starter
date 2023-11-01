import type { FastifyInstance } from "fastify";

import applicationRouter from "@/modules/applications/application.route";
import authRouter from "@/modules/auth/auth.route";
import userRouter from "@/modules/users/user.route";

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api is running" };
	});

	router.register(authRouter, { prefix: "/auth" });
	router.register(applicationRouter, { prefix: "/application" });
	router.register(userRouter, { prefix: "/user" });
}
