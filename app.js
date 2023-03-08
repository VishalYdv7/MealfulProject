const bodyParser = require("body-parser");
const express = require("express");
// const https = require("https");

const fetchData = require("./logic.js");
const processData = require("./logic.js");
// const ScheduleItem = require("./ScheduleItem");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  res.send("<p>Thanks</p>");
  console.log(req.body.date);
});

app.get("/charts", function (req, res) {
  res, sendFile(__dirname + "/chart.js");
});

app.listen(3000, function () {
  console.log("Server is up!");
});
