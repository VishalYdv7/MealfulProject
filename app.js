const bodyParser = require("body-parser");
const express = require("express");
// const https = require("https");
const ejs = require("ejs");

const logic = require("./logic.js");
// const ScheduleItem = require("./ScheduleItem");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/styles.css", function (req, res) {
  res.sendFile(__dirname + "/styles.css");
});

app.post("/", async function (req, res) {
  // res.send("<p>Thanks</p>");
  // console.log(req.body.date);
  const data = await logic.fetchData(req.body.date);
  const time = await logic.fetchTime(req.body.date);
  const myArray = Array.from(data);
  const timeArray = Array.from(time);
  // console.log(data);
  console.log(JSON.stringify(myArray));
  let dataElements = [];
  let valueElements = [];

  for (let i = 0; i < myArray.length; i++) {
    dataElements.push(myArray[i][0].toString());
  }
  for (let i = 0; i < myArray.length; i++) {
    valueElements.push(myArray[i][1]);
  }
  console.log(typeof dataElements[0]);
  console.log(typeof valueElements[0]);
  console.log(dataElements);
  console.log(valueElements);
  console.log("Start of script");
  res.render("displayGraph", { myArray, timeArray });
  console.log("End of script");
});

// app.get("/charts", function (req, res) {
//   res, sendFile(__dirname + "/displayGraph.ejs");
// });

app.listen(3000, function () {
  console.log("Server is up!");
});
