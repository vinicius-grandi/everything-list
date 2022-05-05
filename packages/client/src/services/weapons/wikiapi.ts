import wiki from 'wikijs';
import type { ContentType, WeaponInfo } from './wikiapi.d';

const deepValues = (
  item?: ContentType[] | undefined,
  res: string[] = [],
): string[] => {
  if (!item) {
    return res;
  }
  return item.flatMap((i) => deepValues(i.items, [...res, i.content]));
};

export const getContent = async (
  title: string,
  filter = '.*',
): Promise<ContentType[]> => {
  const regex = new RegExp(`${filter}`, 'gi');
  const page = await wiki().page(title);
  const contents = ((await page.content()) as unknown as ContentType[]).filter(
    (content) => content.title.search(regex) > -1,
  );
  return contents;
};

export const getWeaponsName = async (p: number): Promise<WeaponInfo> => {
  const res: string[] = [];
  const weaponList: WeaponInfo = {
    pagination: {
      lastVisiblePage: 0,
      hasNextPage: false,
    },
    data: [],
  };
  const contents = await getContent(
    'List_of_premodern_combat_weapons',
    '(weapons | weapon)',
  );

  contents.forEach((w) => {
    if (Array.isArray(w.items)) {
      const filteredWeapons = deepValues(w.items).filter(
        (weaponString) =>
          weaponString.length > 1 && weaponString.search(/ \(.+\)/gi) > -1,
      );
      const weapons = filteredWeapons
        .map((val) => {
          return `${val
            .replaceAll(/^.*\./gi, '')
            .replaceAll(/ \(.+\)/gi, '')}\n`;
        })
        .join('')
        .split('\n')
        .filter((weapon) => weapon.length >= 1);
      res.sort().push(...weapons);
      weaponList.pagination.lastVisiblePage = Math.ceil(res.length / 21);
    }
  });
  // 20(p - 1) => generating function => 0, 20, 40, 60, 80, 100...
  // res = res.filter((_v, i) => i >= 20 * (p - 1) && i <= 20 * (p + 1 - 1));
  res.forEach((weapon) => {
    const w = weapon.match(/[^,]*/) ?? [''];
    const weaponSynonyms = weapon.split(', ');
    weaponSynonyms.shift();
    weaponList.data.push({
      name: w[0],
      imagePath: null,
      summary: null,
      synonyms: weaponSynonyms.join(', '),
      wikiLink: null,
    });
  });
  return weaponList;
};

const getWeaponsList = async (weapons: WeaponInfo): Promise<WeaponInfo> => {
  const weaponsList = [...weapons.data];

  const promises = weaponsList.map(async (weapon, i) => {
    const page = await wiki().page('List_of_premodern_combat_weapons');
    const links = await page.links();

    const query = links.find((val: string) => {
      const regex = new RegExp(`${weapon.name}`, 'gi');
      return regex.test(val);
    });

    if (query === undefined) return;
    try {
      const w = await wiki().page(query);
      const weaponImage = await w.mainImage();
      const weaponSummary = await w.summary();
      weaponsList[i].imagePath = weaponImage;
      weaponsList[i].summary = weaponSummary;
      weaponsList[i].wikiLink = query;
    } catch {
      //
    }
  });

  await Promise.all(promises);
  return {
    pagination: {
      lastVisiblePage: weapons.pagination.lastVisiblePage,
      hasNextPage: weapons.pagination.hasNextPage,
    },
    data: weaponsList,
  };
};

async function getAllWeapons(p: number): Promise<WeaponInfo> {
  const res = await getWeaponsName(p);
  const weaponsList: WeaponInfo = await getWeaponsList(res);
  console.log(weaponsList);
  return weaponsList;
}

export default getAllWeapons;
