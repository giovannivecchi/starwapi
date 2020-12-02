import { Router } from 'express';
import StarWars from '../controllers/swapiController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).send({ mensagem: 'API em Execução' });
});

routes.get('/filmes', StarWars.findFilms) ;

export default routes;
