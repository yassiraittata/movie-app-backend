import "dotenv/config";
import { definePrismaConfig, env } from "prisma/config";

export default definePrismaConfig({
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },

  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasources: {
    url: env("DATABASE_URL"),
  },
});
