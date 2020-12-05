import axios from 'axios';
import { format } from 'date-fns';

export default {
  async getCharacters(characters) {
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
  },

  async getFilms(films) {
    const film = await films.map(async film => {
      const filmReturn = await axios.get(film).then(res => {
        return res.data;
      });

      return {
        titulo: filmReturn.title,
        episodio: filmReturn.episode_id,
        diretor: filmReturn.director,
        produtor: filmReturn.producer,
        dataLancamento: format(new Date(filmReturn.release_date), 'dd/MM/yyyy'),
      };
    });

    const jsonReturn = await Promise.all(film);

    return jsonReturn;
  },

  async filtered(dados, filters, query) {
    const jsonReturn = await dados.filter(p => {
      if (filters.titulo !== undefined && filters.titulo !== `"${p.titulo}"`) {
        return false;
      }
      if (
        filters.episodio !== undefined &&
        filters.episodio !== `"${p.episodio}"`
      ) {
        return false;
      }
      if (
        filters.dataLancamento !== undefined &&
        filters.dataLancamento !== `"${p.dataLancamento}"`
      ) {
        return false;
      }
      if (filters.nome !== undefined && filters.nome !== `"${p.nome}"`) {
        return false;
      }
      if (filters.tipo !== undefined && filters.tipo !== `"${p.tipo}"`) {
        return false;
      }
      if (
        filters.planeta !== undefined &&
        filters.planeta !== `"${p.planeta}"`
      ) {
        return false;
      }
      if (filters.nome !== undefined && filters.nome !== `"${p.nome}"`) {
        return false;
      }
      if (filters.tipo !== undefined && filters.tipo !== `"${p.tipo}"`) {
        return false;
      }
      if (
        filters.planeta !== undefined &&
        filters.planeta !== `"${p.planeta}"`
      ) {
        return false;
      }
      return true;
    });

    if (Object.entries(filters).length > 0) {
      const like = [];
      dados.filter(p => {
        switch (query) {
          case 'films': {
            this.AddOrRemove(jsonReturn, like, p.titulo);
          }
          case 'planets': {
            this.AddOrRemove(jsonReturn, like, p.nome);
          }
          case 'people': {
            this.AddOrRemove(jsonReturn, like, p.nome);
          }
        }
      });

      jsonReturn.push({ sugestao: like });
    }

    return jsonReturn;
  },

  async AddOrRemove(verify, set, field) {
    let dadosFiltrados = verify.findIndex(value => {
      if (value.nome !== undefined) {
          return value.nome == field;
      }
      if (value.titulo !== undefined) {
        return value.titulo == field;
      }
    });

    let dadosSugestao = set.findIndex(value => value == field);
    if (dadosFiltrados < 0 ) {
      if (dadosSugestao < 0) {
        if (set.length < 3) {
          set.push(field);
        }
      } else {
        set.splice(dadosSugestao, 1);
      }
    }
  },
};
