import axios from 'axios';
import type { GoogleBooksApi } from './googlebooksapi.d';

async function getBookSearch(queryParams = 'a&maxResults=20'): Promise<
  GoogleBooksApi & {
    maxPage: number;
  }
> {
  const res = await axios.get<GoogleBooksApi>(
    `https://www.googleapis.com/books/v1/volumes?q=${queryParams}`,
  );
  const { data } = res;
  return {
    maxPage: data.totalItems / 20,
    ...data,
  };
}

export default getBookSearch;
