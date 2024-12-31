import type { FastifyInstance } from "fastify";

import { auth } from "@/config/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
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

	router.all(
		"/auth/*",
		{
			schema: {
				tags: ["auth"],
			},
		},
		async (req, res) => {
			const handler = toNodeHandler(auth);

			res.hijack();

			return handler(req.raw, res.raw);
		},
	);

	router.get("/me", async (req, res) => {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		res.status(200);

		return { session };
	});

	router.register(applicationRouter, { prefix: "/application" });
	router.register(userRouter, { prefix: "/user" });
	router.register(roleRouter, { prefix: "/role" });
}
