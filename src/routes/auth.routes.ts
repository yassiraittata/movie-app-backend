import { Router } from "express";

import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { isRefreshTokenValid } from "../middlewares/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

export default (router: Router) => {
  router.post("/auth/register", validateRequest(registerSchema), register);
  router.post("/auth/login", validateRequest(loginSchema), login);
  router.post("/auth/logout", logout);
  router.post("/auth/refresh", isRefreshTokenValid, refreshToken);
};
