const path = require("path");
function getMessage(req, res) {
  res.render("messages", {
    title: "Messages to my friends",
    friend: "elon musk",
  });
  // res.sendFile(path.join(__dirname, "..", "public",'images', "skimountain.jpg"));
}

function postMEssage(req, res) {
  res.send("new messages was created");
}

module.exports = {
  getMessage,
  postMEssage,
};
