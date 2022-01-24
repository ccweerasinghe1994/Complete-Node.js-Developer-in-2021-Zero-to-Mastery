const express = require("express");
const path = require("path");

const friendRouter = require("./routes/friends.routes");
const messageRouter = require("./routes/messages.routes");

const PORT = 3000;

const app = express();
// setting the view engine.
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

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

app.use("/site", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "my friends are very clever",
    caption: "Let's go skiing",
  });
});
// this convert the body to javascript
app.use(express.json());

app.use("/friends", friendRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
