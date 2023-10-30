import * as dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
	PORT: z.number().int().positive().default(8000),
	NODE_ENV: z
		.enum(["development", "staging", "production"])
		.default("development"),
	DATABASE_URI: z.string().url().startsWith("postgres://"),
});

export const env = envSchema.parse(process.env);
