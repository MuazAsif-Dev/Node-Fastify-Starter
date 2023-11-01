// import argon2 from "argon2";
import type { FastifyInstance } from "fastify";

export default async function authRouter(router: FastifyInstance) {
	router.post("/", async (request, reply) => {
		// const password = request.body.password;
		// const hashedPassword = await argon2.hash(request.body?.password);

		// console.log(password, hashedPassword);

		reply.send("OK");
	});
}
