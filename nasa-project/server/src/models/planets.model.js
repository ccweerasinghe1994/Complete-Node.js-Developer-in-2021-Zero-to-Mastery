const fs = require("fs");
const path = require("path");

const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

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
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        const planetLength = (await getAllPlanets()).length;
        console.log(`${planetLength} habitable planets found`);
        resolver();
      });
  });
}

async function getAllPlanets() {
  return planets.find(
      {},
      {
        __v: 0,
        _id: 0,
      }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`could not save planet ${error}`);
  }
}

module.exports = {
  loadPlanetData,
  getAllPlanets,
};
