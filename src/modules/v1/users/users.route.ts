import type { FastifyInstance } from "fastify";

import {
	assignRoleTouserHandler,
	createUserHandler,
	loginHandler,
} from "./users.controller";
import {
	createUserJsonSchema,
	createUserToRolesJsonSchema,
	loginUserJsonSchema,
} from "./users.schema";

export default async function userRouter(router: FastifyInstance) {
	router.post("/", { schema: createUserJsonSchema }, createUserHandler);

	router.post("/login", { schema: loginUserJsonSchema }, loginHandler);

	router.post(
		"/roles",
		{ schema: createUserToRolesJsonSchema },
		assignRoleTouserHandler,
	);

	router.get("/", () => {
		return 1;
	});
}
