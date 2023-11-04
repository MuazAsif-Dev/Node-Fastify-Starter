import type { FastifyInstance } from "fastify";

import applicationRouter from "./applications/applications.route";
import authRouter from "./auth/auth.route";
import userRouter from "./users/users.route";

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api v1 is running" };
	});

	router.register(authRouter, { prefix: "/auth" });
	router.register(applicationRouter, { prefix: "/application" });
	router.register(userRouter, { prefix: "/user" });
}
