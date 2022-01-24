const path = require("path");
function getMessage(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "skimountain.jpg"));
}

function postMEssage(req, res) {
  res.send("new messages was created");
}

module.exports = {
  getMessage,
  postMEssage,
};
