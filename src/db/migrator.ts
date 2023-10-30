import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { Client } from "pg";

import { env } from "@/config/env";

async function migrator() {
	try {
		const client = new Client({
			connectionString: env.DATABASE_URI,
			ssl: true,
		});

		await client.connect();
		const dbMigration = drizzle(client);

		await migrate(dbMigration, {
			migrationsFolder: path.resolve(__dirname, "migrations"),
		});

		console.info("Migration done");
		process.exit(0);
	} catch (err) {
		console.error("Migration error: ", err);
		process.exit(1);
	}
}

migrator();
