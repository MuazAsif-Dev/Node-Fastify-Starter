import { z } from "zod";

const envSchema = z.object({
	PORT: z.number().positive().default(8000),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	DATABASE_URI: z.string(),
});

export const env = envSchema.parse(process.env);
