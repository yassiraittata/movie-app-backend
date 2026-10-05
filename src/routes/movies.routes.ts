import { Router } from "express";

export default (router: Router) => {
  router.get("/movies", (req, res) => {
    res.send("Hello, from movies route!");
  });
};
