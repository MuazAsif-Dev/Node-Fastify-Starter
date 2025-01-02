import { env } from "./src/config/env";

import { defineConfig } from "drizzle-kit";
export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema/*",
	dialect: "postgresql",
	migrations: {
		prefix: "timestamp",
	},
	dbCredentials: {
		url: env.WRITER_DATABASE_URI,
	},
	breakpoints: false,
});
