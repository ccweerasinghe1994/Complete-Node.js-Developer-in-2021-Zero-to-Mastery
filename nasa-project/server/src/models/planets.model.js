const fs = require("fs");
const path = require("path");

const { parse } = require("csv-parse");

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

function loadPlanetData() {
  return new Promise((resolver, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "keplor_data.csv")
    )
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
        reject(error);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found`);
        resolver();
      });
  });
}

module.exports = {
  loadPlanetData,
  planets: habitablePlanets,
};
