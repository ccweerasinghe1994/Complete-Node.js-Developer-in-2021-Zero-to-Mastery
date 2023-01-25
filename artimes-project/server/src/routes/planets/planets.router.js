import { Router } from 'express';
import { getAllPlanets } from './planet.controller.js';

const planetRouter = Router();

planetRouter.get('/planets', getAllPlanets);

export { planetRouter };
