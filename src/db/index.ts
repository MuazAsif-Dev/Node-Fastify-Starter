import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { env } from "@/config/env.js";
import * as schema from "@/db/schema/index.js";
import { withReplicas } from "drizzle-orm/pg-core";

const { Pool } = pg;
const writerPool = new Pool({
	connectionString: env.WRITER_DATABASE_URI,
	ssl: env.NODE_ENV === "production",
});

const readerPool = new Pool({
	connectionString: env.READER_DATABASE_URI,
	ssl: env.NODE_ENV === "production",
});

const writerDB = drizzle({
	client: writerPool,
	schema: { ...schema },
});

const read1 = drizzle({
	client: readerPool,
	schema: { ...schema },
});

export const db = withReplicas(writerDB, [read1]);
