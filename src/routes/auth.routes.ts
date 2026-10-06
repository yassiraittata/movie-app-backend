import { Router } from "express";

import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { isRefreshTokenValid } from "../middlewares/auth.js";

export default (router: Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);
  router.post("/auth/refresh", isRefreshTokenValid, refreshToken);
};
