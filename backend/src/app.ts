import express from "express";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import cors from "cors";

import { env } from "./config/env";

export const app = express();
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);