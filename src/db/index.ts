import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { env } from "@/config/env.js";
import * as applications from "./schema/applications.js";
import * as roles from "./schema/roles.js";
import { usersToRoles } from "./schema/users-to-roles.js";
import * as users from "./schema/users.js";

const { Pool } = pg;
const pool = new Pool({
	connectionString: env.DATABASE_URI,
	// ssl: true
});

export const db = drizzle({
	client: pool,
	schema: { ...applications, ...users, ...roles, ...usersToRoles },
});
