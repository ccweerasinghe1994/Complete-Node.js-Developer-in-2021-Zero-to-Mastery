const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const MONGO_URI =
  "mongodb+srv://chamara:RYA0XKeyqZm40Ocy@cluster0.wrspf.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Mongo DB Connection is ready");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function startServer() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} ....`);
  });
}

startServer();
