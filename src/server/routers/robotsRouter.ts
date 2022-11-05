import express from "express";
import { getRobots, getRobotById } from "../controllers/robotsControllers.js";

// eslint-disable-next-line new-cap
const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);

export default robotsRouter;
