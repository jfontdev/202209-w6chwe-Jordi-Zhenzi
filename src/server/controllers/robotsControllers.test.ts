import type { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import Robot from "../../database/models/Robot";
import mockRobots from "../../mocks/mockRobots";
import { deleteRobotById, getRobotById, getRobots } from "./robotsControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

process.env.TOKEN = "f4cd59105097f35b2b61146a74cf0abd64f2bd4d";

describe("Given a Robots controller", () => {
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

  describe("And Robot.findByIdAndDelete should delete robot with id '1'", () => {
    test("Then it should call the findByIdAndDelete method and delete robot with id '1'", async () => {
      const robotToDelete = {
        idRobot: "1",
      };

      const req: Partial<Request> = {
        params: {
          idRobot: "1",
        },
        query: { token: "f4cd59105097f35b2b61146a74cf0abd64f2bd4d" },
      };
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
          query: { token: "f4cd59105097f35b2b61146a74cf0abd64f2bd4d" },
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
        const req: Partial<Request> = {
          params: { idRobot: "1" },
          query: { token: "f4cd59105097f35b2b61146a74cf0abd64f2bd4d" },
        };
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

    test("Then it should return a custom error", async () => {
      const req: Partial<Request> = { params: { idRobot: "1" } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      Robot.findById = jest.fn().mockRejectedValue(new Error(""));

      await getRobotById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
