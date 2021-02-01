const API_KEY = '7e78d9d0b80a5a9938ce5aba09bf2c47';
const BASE_URL = 'https://api.themoviedb.org/3/';
const SEARCH_PATH = 'search/movie';
const TRENDING_PATH = 'trending/movie/day';
const ID_PATH = 'movie/';

const trendingUrl = `${BASE_URL}${TRENDING_PATH}?api_key=${API_KEY}`;
const searchUrl = `${BASE_URL}${SEARCH_PATH}?api_key=${API_KEY}`;



export function fetchTrending() {
  return fetch(trendingUrl).then(checkRequestSuccess).then(r => r.results)
}

export function fetchId(id) {
  return fetch(`${BASE_URL}${ID_PATH}${id}?api_key=${API_KEY}`).then(checkRequestSuccess)
}

export function fetchMovie(search, page) {
  return fetch(`${searchUrl}&page=${page}&query=${search}`).then(checkRequestSuccess).then(r => {
    if(r.results.length === 0) {
      throw new Error('Search result failed. Please enter the correct movie title and try again.');
    }

    return r.results;
  })
}

export function fetchCredits(id) {
  return fetch(`${BASE_URL}${ID_PATH}${id}/credits?api_key=${API_KEY}`).then(r => r.json()).then(r => r.cast);
}

export function fetchReviews(id) {
  return fetch(`${BASE_URL}${ID_PATH}${id}/reviews?api_key=${API_KEY}`).then(r => r.json()).then(r => r.results);
}
 
function checkRequestSuccess(r) {
    let message = 'Oops! Looks like something went wrong';
    
    if (r.status === 422 ) {
      message = 'Search result failed. Please enter the correct movie title and try again.';
      throw new Error(message);
    } else if (r.ok === false || r.status === 404) {
      throw new Error(message);
    } else {
      return r.json()
    }
}