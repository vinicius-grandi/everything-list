import axios from 'axios';
import type { Book, GoogleBooksApi } from './googlebooksapi.d';

async function getBookSearch(queryParams = '?q=a&maxResults=20'): Promise<
  GoogleBooksApi & {
    maxPage: number;
  }
> {
  const res = await axios.get<GoogleBooksApi>(
    `https://www.googleapis.com/books/v1/volumes${queryParams}`,
  );
  const { data } = res;
  return {
    maxPage: Math.ceil(data.totalItems / 20),
    ...data,
  };
}

export async function getBookById(id: string) {
  const res = await axios.get<Book | null>(
    `https://www.googleapis.com/books/v1/volumes/${id}`,
  );
  if (res.status !== 200) return null;
  const { data } = res;
  return data;
}

export default getBookSearch;
