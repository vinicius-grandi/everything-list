import wiki from 'wikijs';

export type ContentType = {
  title: string;
  content: string;
  items: ContentType | ContentType[];
};

const deepValues = (items: ContentType, res: string[] = []): string[] => {
  if (Array.isArray(items.items)) {
    items.items.forEach((item) => deepValues(item, [...res, item.content]));
  }
};

async function getAllWeapons(p: number): Promise<string[]> {
  const page = await wiki().page('List_of_premodern_combat_weapons');
  const links = ((await page.content()) as unknown as ContentType[]).filter(
    (obj) => obj.title.search(/(weapons)/gi) > -1,
  );

  links.forEach((w) => {
    if (Array.isArray(w.items)) {
      w.items.forEach((o) => console.log(o.items));
    }
  });
}

export default getAllWeapons;
