const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Keplor exploration X",
  rocket: "Explorer 101",
  launchData: new Date("December 07, 2030"),
  destination: "Keplor-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
