import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { env } from "@/config/env";

const pool = new Pool({ connectionString: env.DATABASE_URI, ssl: true });

export const db = drizzle(pool);
