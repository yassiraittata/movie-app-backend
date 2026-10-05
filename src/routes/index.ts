import { Router } from "express";

import moviesRoutes from "./movies.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

export default () => {
  moviesRoutes(router);
  authRoutes(router);

  return router;
};
