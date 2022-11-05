import express from "express";
import {
  getRobots,
  getRobotById,
  deleteRobotById,
} from "../controllers/robotsControllers.js";

// eslint-disable-next-line new-cap
const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", deleteRobotById);

export default robotsRouter;
