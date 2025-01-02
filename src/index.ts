import { env } from "@/config/env.js";
import { createServer } from "@/server.js";
import closeWithGrace from "close-with-grace";

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

	closeWithGrace(async ({ signal, err, manual }) => {
		if (err) {
			server.log.error({ err }, "server closing with error");
		} else {
			server.log.info(`${signal} received, server closing`);
		}
		await server.close();
	});
}

main();
