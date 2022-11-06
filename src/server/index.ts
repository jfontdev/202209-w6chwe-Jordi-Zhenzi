import "../loadEnvironment.js";
import "../database/databaseConnection.js";
import type { CorsOptions } from "cors";
import cors from "cors";
import robotsRouter from "./routers/robotsRouter.js";
import express from "express";
import { generalError, unknownEndpoint } from "../middleware/errors.js";

const app = express();

const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());

app.use("/robots", cors(corsOptions), robotsRouter);

app.use(generalError);
app.use(unknownEndpoint);

export default app;
