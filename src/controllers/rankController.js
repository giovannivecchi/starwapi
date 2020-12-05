import db from '../database/connection';

class rankController {
  async listPeople(req, res) {
    const topPersonagens = await db('rank_people')
      .select('name', 'tipo')
      .count('* as total')
      .from('rank_people')
      .groupBy('name')
      .orderBy('total', 'desc')
      .limit(5);

    const totalPeoples = await db('rank_people').count('* as total');
    const { total } = totalPeoples[0];
    topPersonagens.push({ totalPesquisado: total });

    return res.json(topPersonagens);
  }
  async listPlanets(req, res) {
    const topPlanetas = await db('rank_planets')
      .select('name', 'clima')
      .count('* as total')
      .from('rank_planets')
      .groupBy('name')
      .orderBy('total', 'desc')
      .limit(5);

    const totalPlanetas = await db('rank_planets').count('* as total');
    const { total } = totalPlanetas[0];
    topPlanetas.push({ totalPesquisado: total });

    return res.json(topPlanetas);
  }
  async listFilms(req, res) {
    const topFilmes = await db('rank_films')
      .select('title', 'director')
      .count('* as total')
      .from('rank_films')
      .groupBy('title')
      .orderBy('total', 'desc')
      .limit(5);

    const totalfilmes = await db('rank_films').count('* as total');
    const { total } = totalfilmes[0];
    topFilmes.push({ totalPesquisado: total });

    return res.json(topFilmes);
  }
}

module.exports = new rankController();
