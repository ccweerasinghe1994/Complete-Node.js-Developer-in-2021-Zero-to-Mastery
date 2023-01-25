import { Router } from 'express';

const planetRouter = Router();

planetRouter.get('/planets', getAllPlanets);

export { planetRouter };
