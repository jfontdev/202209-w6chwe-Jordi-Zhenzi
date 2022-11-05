import app from "./index.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("robots:server:serverStart");

const serverStart = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Server starting: http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error connecting to the database: ", error.message));
      reject(error);
    });
  });

export default serverStart;
