import { getAllLaunches, addNewLaunch } from '../../models/launches.model.js';

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const {body} = req;
  body.launchDate = new Date(body.launchDate);
  addNewLaunch(body);
  return res.status(201).json(body);
}

export { httpGetAllLaunches,httpAddNewLaunch };
