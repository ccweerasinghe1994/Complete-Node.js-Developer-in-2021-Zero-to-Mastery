const {
  getAllLaunches,
  addNewLaunches,
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

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
};
