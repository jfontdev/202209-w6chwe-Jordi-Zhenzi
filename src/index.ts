import "./loadEnvironment.js";
import "./database/index.js";
import express from "express";
import debugCreator from "debug";

const debug = debugCreator("robots:root");

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use((req, res) => {
  res.status(200).json({ message: "Hola mundo" });
});

app.listen(port, () => {
  debug(`Server starting: http://localhost:${port}`);
});
