export type ContentType = {
  title: string;
  content: string;
  items?: ContentType[];
};

type weapons = {
  name: string;
  rating?: number;
  synonyms: string[] | string;
  summary: string | null;
  imagePath: string | null;
  wikiLink: string | null;
};

export type WeaponInfo = {
  pagination: {
    lastVisiblePage: number;
    hasNextPage: boolean;
  };
  data: weapons[];
};
