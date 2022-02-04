const express = require("express");

const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (new Date() - startTime < duration) {
    //   event loop is blocked
  }
}

app.get("/", (req, res) => {
  res.send("performance example");
});

app.get("/timer", (req, res) => {
  //   delay the response
  delay(9000);
  res.send("Ding Ding Ding");
});

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
