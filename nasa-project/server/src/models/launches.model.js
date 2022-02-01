const launches = new Map();

latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Keplor exploration X",
  rocket: "Explorer 101",
  launchData: new Date("January 17, 2030"),
  target: "Keplor-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
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

module.exports = {
  getAllLaunches,
  addNewLaunches,
};
