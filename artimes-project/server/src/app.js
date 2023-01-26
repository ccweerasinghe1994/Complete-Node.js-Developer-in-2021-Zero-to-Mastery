import express, { json } from 'express';
import cors from 'cors'
import { planetRouter } from './routes/planets/planets.router.js';

const app = express({
  origin: 'http://localhost:3000',
});
app.use(cors())
app.use(json());
app.use(planetRouter);
export { app };
