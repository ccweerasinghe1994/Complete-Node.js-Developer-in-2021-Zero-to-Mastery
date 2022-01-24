const model = require("../models/friends.model");

function getMessages(req, res) {
  res.json(model);
}

function postFriend(req, res) {
  const name = req.body.name;
  if (!name)
    return res.status(400).json({ error: "friend doesn't have a name " });

  const newFriend = {
    id: model.length,
    name: name,
  };

  model.push(newFriend);
  res.status(200).json(newFriend);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friedId);
  const friend = model[friendId];
  if (!friend) res.status(404).json({ error: 'friend doesn"t exists' });
  res.status(200).json(friend);
}

module.exports = {
  getMessages,
  postFriend,
  getFriend,
};
