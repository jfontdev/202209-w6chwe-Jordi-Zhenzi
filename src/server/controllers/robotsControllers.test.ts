import type { Request, Response } from "express";
import Robot from "../../database/models/Robot";
import { getRobotById, getRobots } from "./robotsControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a getRobots controller", () => {
  describe("When it receives a response", () => {
    test("Then it should respond with a status code 200", async () => {
      const expectedStatus = 200;

      Robot.find = jest.fn();

      await getRobots(null, res as Response);

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

      Robot.find = jest.fn().mockReturnValue(robotList);

      await getRobots(null, res as Response);

      expect(res.json).toHaveBeenCalledWith({ robots: robotList });
    });
  });
});

describe("Given a getRobotById controller", () => {
  const robot = [
    {
      robots: {
        features: {
          speed: 2,
          dateOfCreation: "2022-10-21T22:00:00.000Z",
          endurance: 4,
        },
        _id: "63654c8a95408f6adaf32e5a",
        image: "url",
        name: "Robot1",
      },
    },
  ];

  Robot.findById = jest.fn().mockReturnThis();
  Robot.findById = jest.fn().mockReturnValue(robot[0]);

  describe("When it receives a existing ID", () => {
    const req = {
      params: "" as unknown,
    };

    test("Then the status method should be called with a 200", async () => {
      const expectedStatus = 200;

      await getRobotById(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then the json method should be called with a robot", async () => {
      await getRobotById(req as Request, res as Response, null);

      expect(res.json).toHaveBeenCalledWith({ robots: robot[0] });
    });
  });

  describe("When it receives a non-existing ID", () => {
    const req = {
      params: "" as unknown,
    };

    test("Then the status method should be called with a 404", async () => {
      const expectedStatus = 404;

      Robot.findById = jest.fn().mockReturnValue(robot[2]);
      await getRobotById(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then the json method should be called with 'That robot was recycled and does not exist anymore.'", async () => {
      const expectedError = {
        message: "That robot was recycled and does not exist anymore.",
      };

      await getRobotById(req as Request, res as Response, null);

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
