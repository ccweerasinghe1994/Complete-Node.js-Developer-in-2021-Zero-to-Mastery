import { planets } from "../../models/planet.model.js";

function getAllPlanets(req, res) {
  return res.status(200).json(planets);
}

export { getAllPlanets };
