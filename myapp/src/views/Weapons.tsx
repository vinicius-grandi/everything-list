import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import weaponsData from '../data/weapons';
import type { WeaponInfo } from '../services/weapons/wikiapi.d';

const Weapons = (): JSX.Element => {
  const [weapons, setWeapons] = useState<WeaponInfo['data']>([]);

  // getting page
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const changePage = (sign: '+' | '-'): void => {
    if (sign === '+') {
      setPage(page + 1);
      setSearchParams({ page: String(page + 1) });
      return;
    }
    if (page - 1 <= 0) return;
    setPage(page - 1);
    setSearchParams({ page: String(page - 1) });
  };

  useEffect(() => {
    const p = Number(searchParams.get('page'));
    async function weaponsFn(): Promise<void> {
      const w = (await weaponsData(p <= 0 ? 1 : p)).data;
      setWeapons([...w]);
    }
    weaponsFn();
  }, [page, searchParams]);

  return (
    <div>
      <h1>Weapons</h1>
      {weapons.length > 1 ? (
        <ul>
          {weapons.map((val) => (
            <li key={val.name}>{val.name}</li>
          ))}
        </ul>
      ) : (
        <p>Page not found</p>
      )}
      <button
        type="button"
        data-testid="weapons-next-page"
        onClick={() => changePage('-')}
      >
        Previous
      </button>
      <button
        type="button"
        data-testid="weapons-next-page"
        onClick={() => changePage('+')}
      >
        Next
      </button>
    </div>
  );
};

export default Weapons;
