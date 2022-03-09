import React, { useEffect, useState } from 'react';
import getWeapons, { WeaponInfo } from '../services/weapons/wikiapi';

const Weapons = (): JSX.Element => {
  const [weapons, setWeapons] = useState<WeaponInfo[]>([]);

  useEffect(() => {
    async function weaponsFn(): Promise<void> {
      const w = await getWeapons(1);
      setWeapons([...w]);
    }
    weaponsFn();
  }, []);

  return (
    <div>
      <h1>Weapons</h1>
      <ul>
        {weapons !== undefined &&
          weapons.map((val) => <li key={val.name}>{val.name}</li>)}
      </ul>
    </div>
  );
};

export default Weapons;
