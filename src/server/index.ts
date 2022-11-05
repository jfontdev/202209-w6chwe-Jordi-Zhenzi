import "../loadEnvironment.js";
import "../database/databaseConnection.js";
import robotsRouter from "./routers/robotsRouter.js";
import express from "express";

const app = express();

app.use(express.json());

app.use("/robots", robotsRouter);

export default app;
