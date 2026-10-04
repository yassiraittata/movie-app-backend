import express from "express";

import env from "./config/env-validate";
import router from "./routes";

const app = express();

app.use(router());

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
