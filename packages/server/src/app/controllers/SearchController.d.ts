export type QueryItem = {
  list_name: string;
  rating: number;
  id: number | string;
  name: string;
  imagePath: string | null;
} | null;

export type getAnimeOrManga = (
  query: string,
  method: 'getAnimeSearch' | 'getMangaSearch',
  additionalParams: string,
) => Promise<QueryItem | QueryItem[]>;

export type QueryResult = QueryItem[];

export interface IQueryParams {
  q: string;
  f: 'an' | 'ma' | 'we';
}

export type getWeapon = (
  query: string,
  options?: Partial<UpdateOptions>,
) => Promise<QueryItem | QueryItem[]>;

export type getMovieOrBook = (
  query: string,
  isJustOneMovie: boolean,
) => Promise<QueryItem | QueryItem[]>;
