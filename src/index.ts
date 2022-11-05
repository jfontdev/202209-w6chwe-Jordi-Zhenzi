import "./loadEnvironment.js";
import "./database/index.js";
import express from "express";

const port = process.env.PORT;

const app = express();

app.use(express.json());

const { log } = console;

app.use((req, res) => {
  res.status(200).json({ message: "Hola mundo" });
});

app.listen(port, () => {
  log(`Server starting: http://localhost:${port}`);
});
