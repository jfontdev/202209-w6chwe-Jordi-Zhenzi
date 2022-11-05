import type { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import Robot from "../../database/models/Robot";
import mockRobots from "../../mocks/mockRobots";
import { deleteRobotById, getRobots } from "./robotsControllers";

describe("Given a Robots controller", () => {
  describe("When it receives a response", () => {
    test("Then it should respond with a status code 200", async () => {
      const expectedStatus = 200;

      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Robot.find = jest.fn();

      await getRobots(req as Request, res as Response);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatus);
    });
  });

  describe("And Robot.find should return 'Robot1' and 'Robot2'", () => {
    test("Then it should call the find method with 'Robot1' and 'Robot2'", async () => {
      const robotList = [
        {
          name: "Robot1",
        },
        {
          name: "Robot2",
        },
      ];

      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Robot.find = jest.fn().mockReturnValue(robotList);

      await getRobots(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ robots: robotList });
    });
  });

  describe("And Robot.findByIdAndDelete should delete robot with id '1'", () => {
    test("Then it should call the findByIdAndDelete method and delete robot with id '1'", async () => {
      const robotToDelete = {
        idRobot: "1",
      };

      const req: Partial<Request> = { params: { idRobot: "1" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      Robot.findByIdAndDelete = jest.fn().mockReturnValue(robotToDelete);

      await deleteRobotById(req as Request, res as Response, null);

      expect(res.json).toHaveBeenCalledWith({ robots: robotToDelete });
    });

    describe("And Robot.findByIdAndDelete get a robot that doesn't exist", () => {
      test("Then it should return a status 404", async () => {
        const expectedStatus = 404;

        const req: Partial<Request> = {
          params: { idRobot: "63656521971d796cead92382" },
        };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnValue(mockRobots),
        };

        Robot.findByIdAndDelete = jest.fn().mockReturnValueOnce(mockRobots[1]);

        await deleteRobotById(req as Request, res as Response, null);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });

    describe("And the request it's rejected", () => {
      test("Then it should return a custom error", async () => {
        const req: Partial<Request> = { params: { idRobot: "1" } };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        const next = jest.fn();

        Robot.findByIdAndDelete = jest.fn().mockRejectedValue(new Error(""));

        await deleteRobotById(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalled();
      });
    });
  });
});
