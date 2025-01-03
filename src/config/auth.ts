import { db } from "@/db/index.js";
import * as schema from "@/db/schema/index.js";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
	basePath: "/api/v1/auth",
	plugins: [
		openAPI({
			disableDefaultReference: true,
		}),
	],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: { ...schema },
	}),
	emailAndPassword: {
		enabled: true,
	},
});
