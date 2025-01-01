import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { env } from "@/config/env.js";
import * as schema from "@/db/schema/index.js";

const { Pool } = pg;
const pool = new Pool({
	connectionString: env.DATABASE_URI,
	// ssl: true
});

export const db = drizzle({
	client: pool,
	schema: { ...schema },
});
