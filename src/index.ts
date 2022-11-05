/* eslint-disable no-implicit-coercion */
import "./loadEnvironment.js";
import databaseConnection from "./database/databaseConnection.js";
import serverStart from "./server/serverStart.js";

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

(async () => {
  await databaseConnection(mongoUrl);
  await serverStart(+port);
})();
