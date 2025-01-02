import userRouter from "@/modules/v1/users/users.route.js";
import type { FastifyInstance } from "fastify";

export default async function router(router: FastifyInstance) {
	router.register(userRouter, { prefix: "/user" });
}
