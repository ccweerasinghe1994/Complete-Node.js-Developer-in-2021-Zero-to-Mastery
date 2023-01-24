/**
 * @type class
 */


const EventEmitter = require("events");

const celebrity = new EventEmitter();

// subscribe to the celebrity observer one
celebrity.on("race", (result) => {
  if (result === "win") {
    console.log("congratulation! you are the best");
  }
});

// subscribe to the celebrity observer two
celebrity.on("race", (result) => {
  if (result === "lost") {
    console.log("boo i could have done much better");
  }
});

process.on("exit", (code) => {
  console.log("Process exit with code :" + code);
});
celebrity.emit("race", "win");
celebrity.emit("race", "lost");
