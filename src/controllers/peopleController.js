import api from '../services/api';
import axios from 'axios';
import swapiController from './swapiController';

class peopleController {
  async findPeople(req, res) {
    try {
      const { nome, tipo, planeta } = req.query;

      const results = await api.get('people/').then(res => {
        return res.data.results;
      });

      const promises = results.map(async people => ({
        nome: people.name,
        tamanho: people.height,
        peso: people.mass,
        cor_cabelo: people.hair_color,
        tipo: people.skin_color,
        cor_olhos: people.eye_color,
        genero: people.gender,
        filmes: await swapiController.getFilms(people.films),
        planeta: await peopleController.getPlaneta(people.homeworld),
      }));

      const jsonReturn = await Promise.all(promises);

      const peopleFiltered = await swapiController.filtered(
        jsonReturn,
        Object.entries(req.query).length == 0
          ? {}
          : {
              nome: nome,
              tipo: tipo,
              planeta: planeta,
            },
        'people'
      );

      return res.status(200).json(peopleFiltered);
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

module.exports = new peopleController();
