const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { logger } = require("./src/utils");
const mongoose = require("mongoose");
const router = express.Router();

const app = express();

app.use(cors());
app.use(express.static("public"));
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
})
.catch((err) => {
  console.log(err);
});
app.listen(7000);
