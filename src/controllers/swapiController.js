import api from '../services/api';
import { format } from 'date-fns';
import axios from 'axios';

class swapiController {
  async findFilms(req, res) {
    try {
      const results = await api.get('films/').then(res => {
        return res.data.results;
      });

      const promises = results.map(async films => ({
        titulo: films.title,
        episodio: films.episode_id,
        diretor: films.director,
        produtor: films.producer,
        dataLancamento: format(new Date(films.release_date), 'dd/MM/yyyy'),
        personagens: await swapiController.getCharacters(films.characters),
        planetas: await swapiController.getPlanets(films.planets),
      }));

      const jsonReturn = await Promise.all(promises);

      return res.status(200).json(jsonReturn);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true });
    }
  }

  static async getCharacters(characters) {
    const character = await characters.map(async people => {
      const characterReturn = await axios.get(people).then(res => {
        return res.data;
      });

      return {
        nome: characterReturn.name,
        tamanho: characterReturn.height,
        peso: characterReturn.mass,
        sexo: characterReturn.gender,
      };
    });

    const jsonReturn = await Promise.all(character);

    return jsonReturn;
  }

  static async getPlanets(planets) {
    const planet = await planets.map(async planet => {
      const planetReturn = await axios.get(planet).then(res => {
        return res.data;
      });

      return {
        nome: planetReturn.name,
        tamanho: planetReturn.diameter,
        clima: planetReturn.climate,
        terreno: planetReturn.terrain,
        populacao: planetReturn.population,
      };
    });

    const jsonReturn = await Promise.all(planet);

    return jsonReturn;
  }
}
module.exports = new swapiController();
