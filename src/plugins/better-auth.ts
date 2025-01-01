import { auth } from "@/config/auth.js";
import { toNodeHandler } from "better-auth/node";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function fastifyBetterAuthPlugin(
	fastify: FastifyInstance,
): Promise<void> {
	const authhandler = toNodeHandler(auth);

	fastify.addContentTypeParser(
		"application/json",
		(_request, _payload, done) => {
			done(null, null);
		},
	);

	fastify.all(
		"/api/v1/auth/*",
		{
			schema: {
				tags: ["auth"],
			},
		},
		async (request, reply) => {
			await authhandler(request.raw, reply.raw);
		},
	);
}
