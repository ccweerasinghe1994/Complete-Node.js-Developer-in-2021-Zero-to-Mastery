import {
  getAllLaunches,
  addNewLaunch,
  isLaunchExists,
  abortLaunchById,
} from '../../models/launches.model.js';

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const { body } = req;

  if (!body.mission || !body.rocket || !body.target || !body.launchDate) {
    res.status(401).json({
      error: 'missing required fields',
    });
  }

  body.launchDate = new Date(body.launchDate);
  if (isNaN(body.launchDate)) {
    res.status(401).json({
      error: 'invalid launch date',
    });
  }
  addNewLaunch(body);
  return res.status(201).json(body);
}

function httpDeleteLaunch(req, res) {
  const id = +req.params.id;
  if (!isLaunchExists(id)) {
    return res.status(404).json({
      error: 'Launch Not Found',
    });
  }
  const aborted = abortLaunchById(id);
  return res.status(200).json(aborted);
}

export { httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch };
