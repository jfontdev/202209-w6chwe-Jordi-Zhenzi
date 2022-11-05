import type { Request, Response } from "express";
import Robot from "../../database/models/Robot";
import { getRobots } from "./robotsControllers";

describe("Given a  Robots controller", () => {
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
});
