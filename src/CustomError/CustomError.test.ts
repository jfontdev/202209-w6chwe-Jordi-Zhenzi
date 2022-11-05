import CustomError from "./CustomError.js";

describe("Given the class CustomError", () => {
  describe("When instantiated with message 'Error' with status 400 and public message 'Something went wrong'", () => {
    test("Then it should create an object with message 'Error' with status 400 and public message 'Something went wrong'", () => {
      const expectedCustomError = {
        message: "Error",
        status: 400,
        publicMessage: "Something went wrong",
      };
      const { message, status, publicMessage } = expectedCustomError;
      const messageProperty = "message";
      const statusProperty = "status";
      const publicMessageProperty = "publicMessage";

      const resultCustomError = new CustomError(message, status, publicMessage);

      expect(resultCustomError).toHaveProperty(messageProperty, message);
      expect(resultCustomError).toHaveProperty(statusProperty, status);
      expect(resultCustomError).toHaveProperty(
        publicMessageProperty,
        publicMessage
      );
    });
  });
});
