import express from "express";

import env from "./config/env-validate";

const app = express();

app.get("/", (req, res) => {
  console.log("Request received", req);
  res.send("Hello, World!");
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
