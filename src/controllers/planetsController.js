import api from '../services/api';
import axios from 'axios';
import swapiController from './swapiController';
import db from '../database/connection';

class planetController {
  async findPlanets(req, res) {
    try {
      const { nome, terreno, clima } = req.query;

      const results = await api.get('planets/').then(res => {
        return res.data.results;
      });

      const promises = results.map(async planet => ({
        nome: planet.name,
        rotacao: planet.rotation_period,
        periodo_orbital: planet.orbital_period,
        diametro: planet.diameter,
        clima: planet.climate,
        gravidade: planet.gravity,
        terreno: planet.terrain,
        populacao: planet.population,
        residentes: await swapiController.getCharacters(planet.residents),
        filmes: await swapiController.getFilms(planet.films),
      }));

      const jsonReturn = await Promise.all(promises);

      const planetFiltered = await swapiController.filtered(jsonReturn, {
        nome: nome,
        terreno: terreno,
        clima: clima,
      });

      await planetFiltered.map(async dados => {
        if (dados.nome !== undefined) {
          await db('rank_planets').insert({
            name: dados.nome,
            clima: dados.clima,
          });
        }
      });

      return res.status(200).json(planetFiltered);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async getPlaneta(planet) {
    const planetReturn = await axios.get(planet).then(res => {
      return res.data;
    });
    return planetReturn.name;
  }
}

module.exports = new planetController();
