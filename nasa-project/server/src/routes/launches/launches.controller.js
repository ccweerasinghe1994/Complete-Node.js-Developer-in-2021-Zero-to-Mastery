const {
  getAllLaunches,
  addNewLaunches,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, res) {
  const launch = req.body;
  const { rocket, target, mission, launchDate } = launch;
  // validation
  if (!mission || !target || !rocket || !launchDate)
    return res.status(400).json({
      error: "missing required mission property",
    });

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate))
    return res.status(400).json({
      error: "Invalid Launch Date",
    });

  addNewLaunches(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId))
    return res.status(404).json({
      error: "Launch not found",
    });

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbortLaunch,
};
