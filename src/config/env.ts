import * as dotenv from "dotenv";
import { type ZodError, z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.number().int().positive().default(8000),
	NODE_ENV: z
		.enum(["development", "staging", "production"])
		.default("development"),
	WRITER_DATABASE_URI: z.string().url().startsWith("postgres://"),
	READER_DATABASE_URI: z.string().url().startsWith("postgres://"),
});

let parsedEnv: z.infer<typeof envSchema>;

try {
	parsedEnv = envSchema.parse(process.env);
} catch (e) {
	const error = e as ZodError;
	console.error("❌ Invalid env:");
	console.error(error.flatten().fieldErrors);
	process.exit(1);
}

export const env = parsedEnv;
