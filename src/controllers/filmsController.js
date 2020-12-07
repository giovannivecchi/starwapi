import api from '../services/api';
import { format } from 'date-fns';
import axios from 'axios';
import swapiController from './swapiController';
import db from '../database/connection';

class filmsController {
  async findFilms(req, res) {
    try {
      const { titulo, episodio, dataLancamento } = req.query;

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
        planetas: await filmsController.getPlanets(films.planets),
      }));

      const jsonReturn = await Promise.all(promises);

      const filmsFiltered = await swapiController.filtered(
        jsonReturn,
        Object.entries(req.query).length == 0
          ? {}
          : {
              titulo: titulo,
              episodio: episodio,
              data_lancamento: dataLancamento,
            },
        'films'
      );

      await filmsFiltered.map(async dados => {        
        if (dados.titulo !== undefined) {
          await db('rank_films').insert({
            title: dados.titulo,
            director: dados.diretor,
          });
        }
      });

      return res.status(200).json(filmsFiltered);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
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
module.exports = new filmsController();
