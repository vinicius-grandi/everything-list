import axios from 'axios';
import type { Animes, Anime, DataAndPagination } from './jikanapi.d';

export async function getSchedule(page: number): Promise<Animes> {
  const res = await axios.get(
    `https://api.jikan.moe/v4/schedules?page=${page}`,
  );
  const {
    data: { data },
  } = res;
  return data;
}

export async function getAnimeSearch(
  queryParams: string,
  mangaOrAnime = 'anime',
): Promise<DataAndPagination | { data: Anime } | null> {
  const res = await axios.get(
    `https://api.jikan.moe/v4/${mangaOrAnime}${queryParams}`,
  );
  const {
    data: { data, pagination },
  } = res;
  return {
    pagination: pagination ?? 0,
    data,
  };
}

export async function getMangaSearch(
  queryParams: string,
): Promise<DataAndPagination | { data: Anime } | null> {
  const res = await axios.get(`https://api.jikan.moe/v4/manga${queryParams}`);
  const {
    data: { data, pagination },
  } = res;
  return {
    pagination: pagination ?? 0,
    data,
  };
}

export async function getAnimeOrMangaById(
  id: number,
  type: 'anime' | 'manga' = 'anime',
): Promise<Anime | null> {
  const res = await axios.get(`https://api.jikan.moe/v4/${type}/${id}`);
  const {
    data: { data },
  } = res;
  return data;
}

export function verifyAnime(anime: Anime) {
  if ('id' in anime) {
    return {
      id: anime.mal_id,
      imagePath: anime.images.jpg.image_url,
      list_name: 'animes',
      name: anime.title,
    };
  }
  return null;
}
