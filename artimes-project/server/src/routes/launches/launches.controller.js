import { getAllLaunches, setLaunch } from '../../models/launches.model.js';

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpSetLaunch(req, res) {
  const {body} = req;
  return res.status(200).json(setLaunch(body));
}

export { httpGetAllLaunches,httpSetLaunch };
