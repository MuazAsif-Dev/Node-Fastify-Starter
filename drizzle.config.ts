import type { Config } from "drizzle-kit";
import { env } from "./src/config/env";

export default {
	schema: "./src/db/models/*",
	out: "./src/db/migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: env.DATABASE_URI,
	},
	breakpoints: false,
} satisfies Config;
