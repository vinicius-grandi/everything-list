import axios from 'axios';
import type { Movie, OMDB } from './omdbapi.d';

async function getMovieSearch(queryParams = 's=aaa&page=1'): Promise<
  OMDB & {
    maxPage: number;
  }
> {
  const url = `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&${queryParams}`;
  const res = await axios.get<OMDB>(url);
  const { data } = res;
  return {
    maxPage: Math.ceil(Number(data.totalResults) / 10),
    ...data,
  };
}

export async function getMovieById(id: string) {
  const url = `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`;
  const res = await axios.get<Movie>(url);
  if (res.status !== 200) return null;
  const { data } = res;
  return data;
}

export default getMovieSearch;
