import type { FastifyInstance } from "fastify";

import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api is running" };
	});

	router.register(authRouter, { prefix: "/api/auth" });
	router.register(userRouter, { prefix: "/api/user" });
}
