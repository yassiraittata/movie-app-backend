import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import env from "./config/env-validate.js";
import router from "./routes/index.js";
import { notFoundHandler } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use(router());

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
