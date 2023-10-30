import { env } from "@/config/env.js";
import { createServer } from "@/server.js";

async function main() {
	const server = await createServer();

	server.listen({ port: env.PORT }, function (err) {
		if (err) {
			server.log.error(err);
			process.exit(1);
		}
	});

	server.log.debug(env, "Here are the envs");

	const signals = ["SIGINT", "SIGTERM"];

	signals.forEach((signal) => {
		process.on(signal, async () => {
			server.log.info("Server closing");

			await server.close();

			process.exit(0);
		});
	});
}

main();
