import { cleanEnv, port } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 8000 }),
});

export default env;
