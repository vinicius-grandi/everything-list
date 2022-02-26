export async function getSchedule(page: number) {
  const res = await fetch(`https://api.jikan.moe/v4/schedules?page=${page}`);
  const data = await res.json();
  return data;
}

export async function getAnimeById(id: string) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await res.json();
  return data;
}
