import { Router } from "express";

import { register } from "../controllers/auth.controller.js";

export default (router: Router) => {
  router.post("/auth/register", register);
};
