import express, { json } from 'express';
import { planetRouter } from './routes/planets/planets.router.js';

const app = express();
app.use(json());
app.use(planetRouter);
export { app };
