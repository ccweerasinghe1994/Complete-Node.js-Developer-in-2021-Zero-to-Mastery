const launchesDataBase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();

latestFlightNumber = 100;

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

function addNewLaunches(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      upcoming: true,
      customers: ["Zero to mastery", "NASA"],
      success: true,
    })
  );
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
  await launchesDataBase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
  existsLaunchWithId,
  abortLaunchById,
};
