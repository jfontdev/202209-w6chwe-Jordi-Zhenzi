import express from "express";
import getRobots from "../controllers/robotsControllers.js";

// eslint-disable-next-line new-cap
const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);

export default robotsRouter;
