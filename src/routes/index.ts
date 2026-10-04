import { Router } from "express";

import userRoutes from "./user.routes";

const router = Router();

export default () => {
  userRoutes(router);

  return router;
};
