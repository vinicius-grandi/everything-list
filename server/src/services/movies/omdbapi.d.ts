type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type OMDB = {
  Search: Movie[];
  totalResults: string;
  Response: string;
};
