import getAllWeapons from '../../../services/weapons/wikiapi';

describe('Weapons', () => {
  it('should return a flat map from wikipedia items', () => {
    type mockArr = {
      items: mockArr[] | undefined;
      content: string;
    };
    const deepKeys = (
      item: mockArr[] | undefined,
      res: string[] = [],
    ): string[] => {
      if (!item) {
        return res;
      }
      return item.flatMap((i) => deepKeys(i.items, [...res, i.content]));
    };

    const input: mockArr[] = [
      {
        items: [
          {
            content: 'jojojo',
            items: [
              {
                items: undefined,
                content: 'hello',
              },
            ],
          },
        ],
        content: 'teste',
      },
    ];

    expect(deepKeys(input)).toEqual(['teste', 'jojojo', 'hello']);
  });
  it('should return weapons', async () => {
    await getAllWeapons(1);
    expect(1).toBe(2);
  });
});
