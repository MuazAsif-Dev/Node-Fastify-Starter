import { env } from "./src/config/env";

import { defineConfig } from "drizzle-kit";
export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema/*",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URI,
	},
	breakpoints: false,
});
