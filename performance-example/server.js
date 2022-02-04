const express = require("express");

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
  delay(4000);
  res.send(`Beep Beep Beep ${process.pid}`);
});

console.log("worker has been started");
app.listen(3000, () => {
  // console.log(`server is running on port 3000`);
});
