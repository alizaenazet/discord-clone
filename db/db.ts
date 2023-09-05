import * as schema from './schema'
import { drizzle } from "drizzle-orm/mysql2";
import { connect } from "@planetscale/database";
import mysql from "mysql2/promise";
import 'dotenv/config';


const DbUrl = process.env.DATABASE_URL
if (!DbUrl) {
  
  throw new Error("env var DB URL is missing")
}
// create the connection
// url: process.env.DATABASE_URL
const connection = await mysql.createConnection({
  uri: DbUrl
});
 
export const db = drizzle(connection,{ schema, mode: "planetscale"});