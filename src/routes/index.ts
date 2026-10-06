import { Router } from "express";

import moviesRoutes from "./movies.routes.js";
import authRoutes from "./auth.routes.js";
import watchlistRoutes from "./watchlist.routes.js";

const router = Router();

export default () => {
  moviesRoutes(router);
  authRoutes(router);
  watchlistRoutes(router);

  return router;
};
