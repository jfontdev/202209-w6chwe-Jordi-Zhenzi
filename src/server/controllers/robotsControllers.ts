import debugCreator from "debug";
import type { Request, Response } from "express";
import Robot from "../../database/models/Robot.js";
import chalk from "chalk";

const debug = debugCreator("robots:server:controllers:robotsController");

export const getRobots = async (req: Request, res: Response) => {
  const robotList = await Robot.find();

  res.status(200).json({ robots: robotList });
  debug(chalk("The robot list have been succesfully sended"));
};

export const getRobotById = async (req: Request, res: Response) => {
  const { idRobot } = req.params;

  const robotList = await Robot.findById(idRobot);
  res.status(200).json({ robots: robotList });
};
