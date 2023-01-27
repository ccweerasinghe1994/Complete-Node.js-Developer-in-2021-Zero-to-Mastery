import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
};
const loadCSVDate = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'keplor_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (error) => {
        console.log(error);
        reject(error);
      })
      .on('end', () => {
        resolve();
      });
  });
};

function getAllPlanets() {
  return habitablePlanets;
}
export { getAllPlanets, loadCSVDate };
