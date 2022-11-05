import debugCreator from "debug";
import type { NextFunction, Request, Response } from "express";
import type CustomError from "../CustomError/CustomError";

const debug = debugCreator("robots:errors");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  debug(`There was an error: ${error.message}`);
  const statusCode = error.status ?? 500;
  const publicMessage =
    error.publicMessage || "Failed to connect to the server.";

  res.status(statusCode).json({ message: publicMessage });
};

export const unknownEndpoint = (req: Request, res: Response) => {
  debug("Unknown endpoint");
  res.status(404).json({ message: "Unknown endpoint" });
};
