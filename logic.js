const https = require("https");
const ScheduleItem = require("./ScheduleItem");

fetchData();

function fetchData() {
  const url = "https://www.jsonkeeper.com/b/P2VO";
  https.get(url, function (response) {
    let data = "";
    response.on("data", function (chunk) {
      data += chunk;
    });
    response.on("end", () => {
      const apiResponse = JSON.parse(data);
      processData(apiResponse, "2021-05-21");
    });
  });
}

function processData(apiResponse, inputDate) {
  console.log("processing data...........");
  const scheduleList = [];
  const outputMap = new Map();

  const timeSlots = new Map([
    [1, "12am-3am"],
    [2, "3am-6am"],
    [3, "6am-9am"],
    [4, "9am-12pm"],
    [5, "12pm-3pm"],
    [6, "3pm-6pm"],
    [7, "6pm-9pm"],
    [8, "9pm-12am"],
  ]);

  for (const item of apiResponse) {
    const scheduleItem = new ScheduleItem(
      item.schedule_time,
      item.slot,
      item.item_date
    );
    // scheduleList.push(scheduleItem);
    if (inputDate === scheduleItem.item_date) {
      /// scheduleItem.schedule_time.foreach((dateString) => {
      const dateString = new Date(scheduleItem.schedule_time);
      const date = dateString.getDate();
      const month = dateString.getMonth();
      const year = dateString.getFullYear();
      const hour = dateString.getHours();
      let timeSlot = "";
      let count = "";
      for (const [key, value] of timeSlots.entries()) {
        if (hour >= (key - 1) * 3 && hour < key * 3) {
          timeSlot = value;
          count++;
          break;
        }
      }
      if (outputMap.has(date + " " + month + " " + year + " " + timeSlot)) {
        outputMap.set(
          date + " " + month + " " + year + " " + timeSlot,
          outputMap.get(date + " " + month + " " + year + " " + timeSlot) + 1
        );
      } else {
        outputMap.set(date + " " + month + " " + year + " " + timeSlot, count);
      }
    }
  }
  for (const [date, count] of outputMap) {
    console.log(`${date}: ${count}`);
  }
}
