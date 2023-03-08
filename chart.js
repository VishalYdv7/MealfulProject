const http = require("http");
const Chart = require("node_modules/chart.js/dist/chart.js");

// Trying to make chart on small dataset first

const chartData = {
  type: "bar",
  data: {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Frequency",
        data: [10, 20, 15, 25, 30],
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const chartNode = new Chart({
  type: "bar",
  data: chartData.data,
  options: chartData.options,
});

const server = http.createServer((req, res) => {
  // set the response headers
  res.setHeader("Content-Type", "image/png");

  // send the chart image buffer as the response
  res.end(chartNode.toBuffer("image/png"));
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
