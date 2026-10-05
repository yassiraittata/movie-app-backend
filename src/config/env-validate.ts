import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 8000 }),
  DATABASE_URL: str({ desc: "Database URL" }),
});

export default env;
