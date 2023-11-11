import type { FastifyInstance } from "fastify";

import applicationRouter from "./applications/applications.route";
import roleRouter from "./roles/roles.routes";
import userRouter from "./users/users.route";

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api v1 is running" };
	});

	router.register(applicationRouter, { prefix: "/application" });
	router.register(userRouter, { prefix: "/user" });
	router.register(roleRouter, { prefix: "/role" });
}
