import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import 'dotenv/config';
// if (!process.env.DATABASE_URL) {
//   throw new Error("env var DB URL is missing")
// }else {
//   console.log(" ada cuy");
  
// }
// create the connection
// url: process.env.DATABASE_URL
const connection = connect({
  url: 'mysql://4tcm0wqlfxk28h8fo925:pscale_pw_I6oC2jTQiA6DoTwdv8Zp1oauKILPnVgYhxJJu4CnU7k@aws.connect.psdb.cloud/discord-clone?ssl={"rejectUnauthorized":true}'
});
 
export const db = drizzle(connection);