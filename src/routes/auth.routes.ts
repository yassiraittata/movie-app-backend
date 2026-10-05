import { Router } from "express";

import { register } from "../controllers/auth.controller";

export default (router: Router) => {
  router.post("/auth/register", register);
};
