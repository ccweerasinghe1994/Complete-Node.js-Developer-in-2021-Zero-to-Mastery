const express = require("express");

const cluster = require("cluster");
const os = require("os");

const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (new Date() - startTime < duration) {
    //   event loop is blocked
  }
}

app.get("/", (req, res) => {
  res.send(`performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  //   delay the response
  delay(9000);
  res.send(`Ding Ding Ding ${process.pid}`);
});

if (cluster.isMaster) {
  console.log("Master has been started");
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log("worker has been started");
  app.listen(3000, () => {
    // console.log(`server is running on port 3000`);
  });
}
