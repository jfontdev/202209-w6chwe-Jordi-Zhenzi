import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("robots:database");

const mongoConnection = process.env.MONGO_URL;

mongoose
  .connect(mongoConnection)
  .then(() => {
    debug("Connected correctly to the database.");
  })
  .catch((error) => {
    debug(error);
  });
