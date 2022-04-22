import axios from 'axios';
import type { OMDB } from './omdbapi.d';

async function getMovieSearch(queryParams = 's=aaa&page=1'): Promise<
  OMDB & {
    maxPage: number;
  }
> {
  const res = await axios.get<OMDB>(
    `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&${queryParams}`,
  );
  const { data } = res;
  return {
    maxPage: Math.ceil(Number(data.totalResults) / 10),
    ...data,
  };
}
export default getMovieSearch;
