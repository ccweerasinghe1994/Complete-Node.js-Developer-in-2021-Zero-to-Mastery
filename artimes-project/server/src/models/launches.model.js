const launches = new Map();

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

export { launches };
