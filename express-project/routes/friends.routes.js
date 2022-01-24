const express = require("express");
const friendController = require("../controllers/friends.controller");
const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
  console.log(`id address ${req.ip}`);
  next();
});

friendsRouter.get("/", friendController.getMessages);
friendsRouter.post("/", friendController.postFriend);
friendsRouter.get("/:friedId", friendController.getFriend);

module.exports = friendsRouter;
