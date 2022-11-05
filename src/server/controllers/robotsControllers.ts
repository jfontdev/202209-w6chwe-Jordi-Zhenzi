import debugCreator from "debug";
import type { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robot.js";
import chalk from "chalk";
import CustomError from "../../CustomError/CustomError.js";
import type { Error } from "mongoose";

const debug = debugCreator("robots:server:controllers:robotsController");

export const getRobots = async (req: Request, res: Response) => {
  const robotList = await Robot.find();

  res.status(200).json({ robots: robotList });
  debug(chalk("The robot list have been succesfully sended"));
};

export const getRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;
  try {
    const robot = await Robot.findById(idRobot);

    if (!robot) {
      res.status(404).json({
        message: "That robot was recycled and does not exist anymore.",
      });
      return;
    }

    debug({ robots: robot });
    res.status(200).json({ robots: robot });
  } catch (error: unknown) {
    const idError = new CustomError(
      (error as Error).message,
      500,
      "Robot not found by that ID."
    );
    next(idError);
  }
};

export const deleteRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;

  try {
    const deletedRobot = await Robot.findByIdAndDelete(idRobot);
    if (!deletedRobot) {
      res.status(404).json("Robot not found by that ID.");
      debug(chalk("The robot doesn't exist"));
      return;
    }

    res.status(200).json({ robots: deletedRobot });
    debug(chalk(`The robot with the ${idRobot} was deleted`));
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "General Mongo Pete"
    );
    next(customError);
  }
};
