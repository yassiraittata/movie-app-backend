import { Router } from "express";

import { addTowatchList } from "../controllers/watchlist.controller.js";
import { isAccessTokenValid } from "../middlewares/auth.js";

export default (router: Router) => {
  router.post("/watchlist/add/:movieId", isAccessTokenValid, addTowatchList);
};
