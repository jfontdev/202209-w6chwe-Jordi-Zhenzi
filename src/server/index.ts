import "../loadEnvironment.js";
import "../database/databaseConnection.js";
import robotsRouter from "./routers/robotsRouter.js";
import express from "express";
import { generalError, unknownEndpoint } from "../middleware/errors.js";

const app = express();

app.use(express.json());

app.use("/robots", robotsRouter);

app.use(generalError);
app.use(unknownEndpoint);

export default app;
