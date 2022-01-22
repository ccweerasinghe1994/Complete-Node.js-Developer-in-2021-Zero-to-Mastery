const http = require("http");

// the port our server listens to
const PORT = 3000;

const server = http.createServer((req, res) => {
  // req and req
  // both are readable streams
  //   so we can read them using .on function

  //   to write headers
  if (req.url === "/friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        id: 1,
        name: "sir issac newton",
      })
    );
  } else if (req.url === "/messages") {
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
  }
  // adding more is not allowed
  else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${PORT} ...`);
});
