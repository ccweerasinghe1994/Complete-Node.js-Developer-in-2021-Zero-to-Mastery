const launchesDataBase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Keplor exploration X",
  rocket: "Explorer 101",
  launchData: new Date("December 17, 2030"),
  target: "Kepler-1410 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunches(launch);

async function getAllLaunches() {
  return await launchesDataBase.find({}, { _id: 0, __v: 0 });
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);

  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

async function saveLaunches(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No Matching planet found");
  }
  await launchesDataBase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDataBase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to mastery", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunches(newLaunch);
}

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
};
