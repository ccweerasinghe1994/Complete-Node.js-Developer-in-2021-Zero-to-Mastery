const { send } = require("./request");
const { read } = require("./response");
function getData(url, data) {
  send(url, data);

  return read();
}

const data = getData("https://www.google.com", "hello");

console.log(data);


