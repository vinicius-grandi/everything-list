import axios from 'axios';
import type { Movie, MovieById, OMDB } from './omdbapi.d';

async function getMovieSearch(queryParams = 's=aaa&page=1'): Promise<
  OMDB & {
    maxPage: number;
  }
> {
  const url = `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&type=movie&${queryParams}`;
  const res = await axios.get<OMDB>(url);
  const { data } = res;
  return {
    maxPage: Math.ceil(Number(data.totalResults) / 10),
    ...data,
  };
}

export async function getMovieByTitle(query: string) {
  const url = `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&type=movie&${query}`;
  try {
    const res = await axios.get<Movie>(url);
    const { data } = res;
    if ('Error' in data) {
      return null;
    }
    return data;
  } catch (_error) {
    return null;
  }
}

export async function getMovieById(id: string) {
  const url = `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`;
  const res = await axios.get<MovieById>(url);
  const { data } = res;
  return data;
}

export default getMovieSearch;
