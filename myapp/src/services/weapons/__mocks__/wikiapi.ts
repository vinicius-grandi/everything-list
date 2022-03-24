export const getWeaponsName = (): Promise<object> =>
  Promise.resolve({
    pagination: {
      lastVisiblePage: 0,
      hasNextPage: false,
    },
    data: [
      {
        name: 'armabraba',
        synonyms: ['muitobraba', 'brabissima'],
        imagePath: undefined,
      },
    ],
  });

async function getAllWeapons(): Promise<object> {
  return Promise.resolve({
    pagination: {
      lastVisiblePage: 0,
      hasNextPage: false,
    },
    data: [
      {
        name: 'armaporcaria',
        synonyms: ['muitobraba', 'brabissima'],
        imagePath: undefined,
      },
    ],
  });
}

export default getAllWeapons;
