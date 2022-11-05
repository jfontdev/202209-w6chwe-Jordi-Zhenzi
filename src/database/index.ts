import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("robots:database");

const mongoConnection = process.env.MONGO_URL;

mongoose
  .connect(mongoConnection)
  .then(() => {
    debug("Conexion correcta a la BBDD");
  })
  .catch((error) => {
    debug(error);
  });
