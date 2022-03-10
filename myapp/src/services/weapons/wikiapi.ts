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
  let res: string[] = [];
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
      weaponList.pagination.lastVisiblePage = Math.ceil(weapons.length / 21);
      res.sort().push(...weapons);
    }
  });
  // 20(p - 1) => generating function => 0, 20, 40, 60, 80, 100...
  res = res.filter((_v, i) => i >= 20 * (p - 1) && i <= 20 * (p + 1 - 1));
  res.forEach((weapon) => {
    const w = weapon.match(/[^,]*/) ?? [''];
    const weaponSynonyms = weapon.split(',');
    weaponSynonyms.shift();
    weaponList.data.push({
      name: w[0],
      imagePath: undefined,
      synonyms: [...weaponSynonyms],
    });
  });
  return weaponList;
};

const getWeaponsList = async (weapons: WeaponInfo): Promise<WeaponInfo> => {
  const weaponsList = [...weapons.data];

  const promises = weaponsList.map(async (weapon, i) => {
    const page = await wiki().page('List_of_premodern_combat_weapons');
    const links = await page.links();

    const query =
      links.find((val: string) => {
        const regex = new RegExp(`${weapon.name}`, 'gi');
        return regex.test(val);
      }) ?? '';
    if (query !== '') {
      const weaponImage = await (await wiki().page(query)).mainImage();
      weaponsList[i].imagePath = weaponImage;
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
  return weaponsList;
}

export default getAllWeapons;
