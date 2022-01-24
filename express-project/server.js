const express = require("express");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send({
    id: 1,
    name: "sir issac newton",
  });
});

app.get("/messages", (req, res) => {
  res.send("<ul><li>hello albert einstien</li></ul>");
});

app.post("/messages", (req, res) => {
  res.send("new messages was created");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
