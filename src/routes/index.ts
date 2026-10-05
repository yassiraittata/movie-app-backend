import { Router } from "express";

import moviesRoutes from "./movies.routes";
import authRoutes from "./auth.routes";

const router = Router();

export default () => {
  moviesRoutes(router);
  authRoutes(router);

  return router;
};
