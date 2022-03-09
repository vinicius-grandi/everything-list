type ImgTypesSupported = {
  image_url: string | null;
  small_image_url: string | null;
  large_image_url: string | null;
};

type GeneralInfo = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type AiredInfo = {
  from: string | null;
  to: string | null;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
  };
  string: string | null;
};

type Anime = {
  mal_id: number;
  url: string | null;
  images: {
    [key in 'jpg']: ImgTypesSupported;
  } & {
    [key in 'webp']: ImgTypesSupported;
  };
  trailer: object;
  title: string | null;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string | null;
  source: string | null;
  episodes: number;
  status: string | null;
  airing: true;
  aired: AiredInfo;
  duration: string | null;
  rating: string | null;
  score: null;
  scored_by: null;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: string | null;
  broadcast: object;
  producers: GeneralInfo[];
  licensors: GeneralInfo[];
  studios: GeneralInfo[];
  genres: GeneralInfo[];
  explicit_genres: GeneralInfo[];
  themes: GeneralInfo[];
  demographics: GeneralInfo[];
};

type Animes = {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
  data: Anime[];
};

export async function getSchedule(page: string): Promise<Animes> {
  const res = await fetch(`https://api.jikan.moe/v4/schedules?page=${page}`);
  const data = await res.json();
  return data;
}

export async function getAnimeById(id: number): Promise<{ data: Anime }> {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await res.json();
  return data;
}
