import { MOVIE_URL, POPULAR_URL, SEARCH_URL, FAV_URL } from './config.js';

export const api = {
  async fetchPopularMovies(page) {
    const response = await fetch(POPULAR_URL(page));

    if (response.status !== 200) {
      throw new Error('Popular movies were not fetched.');
    }

    const { results: popularMovies, total_pages: totalPages } = await response.json();
    
    return { popularMovies, totalPages };
  },

  async searchMovies(query, page) {
    const newQuery = query.toLowerCase().replace(/ /g, '%20');
    const response = await fetch(SEARCH_URL(newQuery, page));

    if (response.status !== 200) {
      throw new Error('Search movies were not fetched.');
    }

    const { results: foundMovies, total_pages: totalPages } = await response.json();

    return { foundMovies, totalPages };
  },

  async fetchFavoriteMovies(moviesArray) {
    const promises = [];

    for (const movie of moviesArray) {
      promises.push(fetch(FAV_URL(movie)));
    }

    const responses = await Promise.all(promises)
    const success = responses.every(result => result.status === 200);
    const responsesJsons = responses.map(item => item.json());
    const favmov = await Promise.all(responsesJsons);

    if (!success) {
      throw new Error('Favorite movies were not fetched');
    }

    return favmov;
  },

  async fetchMovie(id) {
    const response = await fetch(MOVIE_URL(id));

    if (response.status !== 200) {
      throw new Error('Movie data is not fetched.');
    }

    const result = await response.json();
    
    return result;
  },
}