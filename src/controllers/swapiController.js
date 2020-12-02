import api from '../services/api';

export default class swapiController {
  static async findAll(req, res) {
    const results  = await api
      .get('films/')
      .then(res => {
        return res.data.results;
      })
      .catch(e => {
        return { error: e };
      });

    return res.json(results);
  }
}
