const launches = new Map();
let latestLaunchNumber = 100;
const launch = {
  flightNUmber: 100,
  mission: 'kepler Exploration X',
  rocket: 'Explorer ISI',
  launchDate: new Date('December 27', 2030),
  destination: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNUmber, launch);

function isLaunchExists(id) {
  return launches.has(id);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(body) {
  latestLaunchNumber++;
  launches.set(
    latestLaunchNumber,
    Object.assign(body, {
      flightNUmber: latestLaunchNumber,
      customer: ['ZTM', 'NASA'],
      upcoming: true,
      success: true,
    }),
  );
  return launches.get(latestLaunchNumber);
}

function abortLaunchById(id) {
  const launch = launches.get(id);
  launch.upcoming = false;
  launch.success = false;
  return launch;
}

export { getAllLaunches, addNewLaunch, isLaunchExists, abortLaunchById };
