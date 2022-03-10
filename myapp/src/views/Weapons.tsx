import React, { useEffect, useState } from 'react';
import getWeapons, { getWeaponsName } from '../services/weapons/wikiapi';
import type { WeaponInfo } from '../services/weapons/wikiapi.d';

const Weapons = (): JSX.Element => {
  const [weapons, setWeapons] = useState<WeaponInfo['data']>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function weaponsFn(): Promise<void> {
      const weaponsName = (await getWeaponsName(page)).data;
      setWeapons([...weaponsName]);
      const w = (await getWeapons(page)).data;
      setWeapons([...w]);
    }
    weaponsFn();
  }, [page]);

  return (
    <div>
      <h1>Weapons</h1>
      <ul>
        {weapons !== undefined &&
          weapons.map((val) => <li key={val.name}>{val.name}</li>)}
      </ul>
      <button
        type="button"
        data-testid="w-next-page"
        onClick={() => setPage(page + 1)}
      >
        NextPage
      </button>
    </div>
  );
};

export default Weapons;
