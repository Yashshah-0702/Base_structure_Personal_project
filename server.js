const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { logger } = require("./src/utils");
const mongoose = require("mongoose");
const router = express.Router();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("App started...");
});

app.use(require("./src/routes")(router));

mongoose
  .connect("mongodb://localhost:27017/certificate")
  .then((data) => {
    console.log("connected to database..");
    app.listen(7000);
  })
  .catch((err) => {
    console.log(err);
  });
