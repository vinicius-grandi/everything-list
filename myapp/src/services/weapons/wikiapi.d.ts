export type ContentType = {
  title: string;
  content: string;
  items?: ContentType[];
};

type weapons = {
  name: string;
  synonyms: string[] | string;
  imagePath: string | undefined;
};

export type WeaponInfo = {
  pagination: {
    lastVisiblePage: number;
    hasNextPage: boolean;
  };
  data: weapons[];
};
