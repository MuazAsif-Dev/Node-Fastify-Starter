import type { FastifyInstance } from "fastify";

export default async function authRouter(router: FastifyInstance) {
	router.post("/", async (request, reply) => {
		reply.send("OK");

		reply.code(200);

		return 1;
	});
}
