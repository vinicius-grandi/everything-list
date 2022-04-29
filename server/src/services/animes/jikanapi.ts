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
): Promise<DataAndPagination | Anime> {
  const res = await axios.get(`https://api.jikan.moe/v4/anime${queryParams}`);
  const {
    data: { data, pagination },
  } = res;
  return {
    pagination,
    data,
  };
}

export async function getMangaSearch(
  queryParams: string,
): Promise<DataAndPagination | Anime> {
  const res = await axios.get(`https://api.jikan.moe/v4/manga${queryParams}`);
  const {
    data: { data, pagination },
  } = res;
  return {
    pagination,
    data,
  };
}

export async function getAnimeById(id: number): Promise<{ data: Anime }> {
  const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
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
