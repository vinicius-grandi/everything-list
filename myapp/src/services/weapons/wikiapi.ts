import wiki from 'wikijs';

export type ContentType = {
  title: string;
  content: string;
  items?: ContentType[];
};

export type WeaponInfo = {
  name: string;
  imagePath: string;
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

const getWeaponsList = async (weapons: string[]): Promise<WeaponInfo[]> => {
  const weaponsList: WeaponInfo[] = [];

  const promises = weapons.map(async (weapon) => {
    const search = weapon.match(/[^,]*/) ?? [''];
    if (search[0] === '') return;
    const page = await wiki().page('List_of_premodern_combat_weapons');
    const links = await page.links();

    const query =
      links.find((val) => {
        const regex = new RegExp(`${weapon}`, 'gi');
        return regex.test(val);
      }) ?? '';

    if (query === '') {
      weaponsList.push({
        name: weapon,
        imagePath: 'https://via.placeholder.com/500x500.png',
      });
      return;
    }
    const weaponImage = await (await wiki().page(query)).mainImage();
    weaponsList.push({
      name: weapon,
      imagePath: weaponImage,
    });
  });

  await Promise.all(promises);
  return weaponsList;
};

const deepValues = (
  item?: ContentType[] | undefined,
  res: string[] = [],
): string[] => {
  if (!item) {
    return res;
  }
  return item.flatMap((i) => deepValues(i.items, [...res, i.content]));
};

async function getAllWeapons(p: number): Promise<WeaponInfo[]> {
  let res: string[] = [];
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
          return `${val.replace(/^.*\./gi, '').replace(/ \(.+\)/gi, '')}\n`;
        })
        .join('')
        .split('\n')
        .filter((weapon) => weapon.length >= 1);
      res.sort().push(...weapons);
    }
  });
  // 20(p - 1) => generating function => 0, 20, 40, 60, 80, 100...
  res = res.filter((_v, i) => i >= 20 * (p - 1) && i <= 20 * (p + 1 - 1));
  const weaponsList: WeaponInfo[] = await getWeaponsList(res);
  return weaponsList;
}

export default getAllWeapons;
