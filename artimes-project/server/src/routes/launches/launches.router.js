import { Router } from 'express';
import { httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch} from './launches.controller.js';

const launchesRouter = Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id',httpDeleteLaunch)
export { launchesRouter };
