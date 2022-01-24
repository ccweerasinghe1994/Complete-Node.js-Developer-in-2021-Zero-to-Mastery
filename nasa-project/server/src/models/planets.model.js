const parse = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

fs.createReadStream("keplor_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    const planetNames = habitablePlanets.map((planet) => ({
      kepler_name: planet.kepler_name,
      kepoi_name: planet.kepoi_name,
    }));
    console.table(planetNames);
    console.log(`${habitablePlanets.length} habitable planets found`);
  });

module.exports = {
  planets: habitablePlanets,
};
