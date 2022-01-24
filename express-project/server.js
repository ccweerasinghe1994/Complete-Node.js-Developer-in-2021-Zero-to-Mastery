const express = require("express");

const PORT = 3000;

const app = express();

const friends = [
  {
    id: 1,
    name: "sir albert einstein",
  },
  {
    id: 1,
    name: "sir issac newton",
  },
];

app.use((req, res, next) => {
  const time = new Date();
  const url = req.url;
  const method = req.method;
  next();
  const delta = new Date() - time;
  console.log(`${method} ${url} ${delta} ms`);
});

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:friedId", (req, res) => {
  const friendId = Number(req.params.friedId);
  const friend = friends[friendId];
  if (!friend) res.status(404).json({ error: 'friend doesn"t exists' });
  res.status(200).json(friend);
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
