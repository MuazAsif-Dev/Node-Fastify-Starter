import type { FastifyInstance } from "fastify";

import { createUserHandler } from "./users.controller";
import { createUserJsonSchema } from "./users.schema";

export default async function userRouter(router: FastifyInstance) {
	router.post("/", { schema: createUserJsonSchema }, createUserHandler);

	router.get("/", () => {
		return 1;
	});
}
