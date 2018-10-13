const ROOT_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e8b2b9d1a810a529d76a8fb24caa84df';

const POPULAR_URL = (page) => `${ROOT_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
const FAV_URL = (id) => `${ROOT_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
const SEARCH_URL = (query, page) => {
  return `${ROOT_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;
};

export { POPULAR_URL, SEARCH_URL, FAV_URL };