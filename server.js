const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
require("./app");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json({ message: "Helth Check" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, async () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
