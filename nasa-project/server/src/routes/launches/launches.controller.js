const {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunches(req, res) {
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

  await scheduleNewLaunch(launch);

  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!(await existsLaunchWithId(launchId)))
    return res.status(404).json({
      error: "Launch not found",
    });

  const aborted = await abortLaunchById(launchId);
  if (!aborted) return res.status(400).json({ error: "Launch Not Aborted" });
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbortLaunch,
};
