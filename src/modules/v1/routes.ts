import type { FastifyInstance } from "fastify";

import applicationRouter from "./applications/applications.route.js";
import roleRouter from "./roles/roles.routes.js";
import userRouter from "./users/users.route.js";

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api v1 is running" };
	});

	router.get("/openapi.json", async () => {
		return router.swagger();
	});

	router.register(applicationRouter, { prefix: "/application" });
	router.register(userRouter, { prefix: "/user" });
	router.register(roleRouter, { prefix: "/role" });
}
