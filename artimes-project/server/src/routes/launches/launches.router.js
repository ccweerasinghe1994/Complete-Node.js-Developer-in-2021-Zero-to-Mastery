import { Router } from 'express';
import { httpGetAllLaunches,httpSetLaunch } from './launches.controller.js';

const launchesRouter = Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpSetLaunch);

export { launchesRouter };
