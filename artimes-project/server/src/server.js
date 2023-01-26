import { createServer } from 'http';
import { app } from './app.js';
import { loadCSVDate } from './models/planet.model.js';

const PORT = process.env.PORT || 8000;

const server = createServer(app);

const startServer = async () => {
  await loadCSVDate();
  server.listen(PORT, () => {
    console.log(`server is listening on ${PORT}..`);
  });
};

startServer();
