const http = require("http");

// the port our server listens to
const PORT = 3000;
let friends = [
  {
    id: 0,
    name: "chamara",
  },
  {
    id: 1,
    name: "gagani",
  },
  {
    id: 2,
    name: "shan",
  },
];
const server = http.createServer((req, res) => {
  // adding friends array

  const items = req.url.split("/");

  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if ((req.method = "GET" && items[1] === "friends")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      res.end(JSON.stringify(friends[Number(items[2])]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Issac</li>");
    res.write("<li>what are your thoughts on astronomy</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
    // adding more is not allowed
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT} ...`);
});
