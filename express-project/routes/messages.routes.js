const express = require("express");

const messageController = require("../controllers/messages.controllers");

const messageRouter = express.Router();

messageRouter.get("/", messageController.getMessage);

messageRouter.post("/", messageController.postMEssage);

module.exports = messageRouter;
