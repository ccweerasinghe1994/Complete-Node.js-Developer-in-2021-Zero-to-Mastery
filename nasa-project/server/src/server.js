const http = require("http");
const {mongoConnect} = require("./services/mongo");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  console.log("connecting to mongo database");
  await mongoConnect();
  console.log("loading planet data");
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} ....`);
  });
}

startServer();
