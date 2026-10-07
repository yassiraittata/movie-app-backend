import { Router } from "express";

import {
  addTowatchList,
  updateWatchlist,
} from "../controllers/watchlist.controller.js";
import { isAccessTokenValid } from "../middlewares/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { watchlistSchema } from "../schemas/watchlist.schema.js";

export default (router: Router) => {
  router.post("/watchlist/add/:movieId", isAccessTokenValid, addTowatchList);
  router.post(
    "/watchlist/update/:id",
    isAccessTokenValid,
    validateRequest(watchlistSchema),
    updateWatchlist,
  );
};
