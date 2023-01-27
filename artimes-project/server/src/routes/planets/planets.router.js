import { Router } from 'express';
import { httpGetAllPlanets } from './planet.controller.js';

const planetRouter = Router();

planetRouter.get('/planets', httpGetAllPlanets);

export { planetRouter };
