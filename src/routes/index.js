import { Router } from 'express';
import filmsController from '../controllers/filmsController';
import peopleController from '../controllers/peopleController';
import planetsController from '../controllers/planetsController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.status(200).send({ mensagem: 'API em Execução' });
});

routes.get('/filmes', filmsController.findFilms);
routes.get('/personagens', peopleController.findPeople);
routes.get('/planetas', planetsController.findPlanets);


export default routes;
