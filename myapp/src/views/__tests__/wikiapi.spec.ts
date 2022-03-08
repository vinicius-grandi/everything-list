import getAllWeapons from '../../../services/weapons/wikiapi';

describe('Weapons', () => {
  it('should return weapons', async () => {
    console.log(await getAllWeapons(2));
    expect(1).toBe(2);
  });
});
