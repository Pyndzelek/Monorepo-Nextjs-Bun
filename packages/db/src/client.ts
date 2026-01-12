import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as userSchema from "./schema/user";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL environment variable");
}

// all DB schemas combined for the client
const schema = { ...userSchema };

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
