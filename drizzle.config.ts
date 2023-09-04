import type { Config } from "drizzle-kit";
import 'dotenv/config';

const DBurl = process.env.DATABASE_URL
if (!DBurl) {
    throw new Error("env var cant read")
}

console.log(DBurl);


export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: DBurl,
  }
} satisfies Config;

