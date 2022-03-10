import type { Animes, Anime } from './jikanapi.d';

export async function getSchedule(page: number): Promise<Animes> {
  const res = await fetch(`https://api.jikan.moe/v4/schedules?page=${page}`);
  const data = await res.json();
  return data;
}

export async function getAnimeById(id: number): Promise<{ data: Anime }> {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await res.json();
  return data;
}
