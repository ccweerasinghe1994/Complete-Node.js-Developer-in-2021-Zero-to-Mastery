const express = require("express");
const path = require("path");

const friendRouter = require("./routes/friends.routes");
const messageRouter = require("./routes/messages.routes");

const PORT = 3000;

const app = express();

app.use("/site", express.static(path.join(__dirname, "public")));

// middle ware
app.use((req, res, next) => {
  const time = Date.now();
  const url = req.url;
  const method = req.method;
  const baseUrl = req.baseUrl;
  next();
  const delta = Date.now() - time;
  console.log(`${method} ${baseUrl}${url} ${delta} ms`);
});

// this convert the body to javascript
app.use(express.json());

app.use("/friends", friendRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
