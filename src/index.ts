import { env } from "@/config/env";
import { createServer } from "@/server";

async function main() {
	const server = await createServer();

	server.listen({ port: env.PORT }, (err) => {
		if (err) {
			server.log.error(err);
			process.exit(1);
		}
	});

	server.log.debug(env, "Here are the envs");

	server.log.debug(
		server.printRoutes({ commonPrefix: false, includeHooks: true }),
	);

	const signals = ["SIGINT", "SIGTERM"];

	for (const signal of signals) {
		process.on(signal, async () => {
			server.log.info("Server closing");
			await server.close();
			process.exit(0);
		});
	}
}

main();
