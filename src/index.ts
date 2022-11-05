import "./loadEnvironment.js";
import "./database/index.js";
import robotsRouter from "./server/routers/robotsRouter.js";
import express from "express";
import debugCreator from "debug";
import { generalError, unknownEndpoint } from "./middleware/errors.js";

const debug = debugCreator("robots:root");

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/robots", robotsRouter);

app.use(generalError);
app.use(unknownEndpoint);

app.listen(port, () => {
  debug(`Server starting: http://localhost:${port}`);
});
