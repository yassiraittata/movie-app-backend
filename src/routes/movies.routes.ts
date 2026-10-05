import { Router } from "express";

export default (router: Router) => {
  router.get("/movies", (_req, res) => {
    res.send("Hello, from movies route!");
  });
};
