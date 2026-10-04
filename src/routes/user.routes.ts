import { Router } from "express";

export default (router: Router) => {
  router.get("/users", (req, res) => {
    res.send("Hello, from users route!");
  });
};
