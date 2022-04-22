import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';
import type { WeaponInfo } from '../services/weapons/wikiapi.d';

const Title = styled.h1`
  @media screen and (min-width: 1001px) {
    font-size: 3rem;
  }

  @media screen and (min-width: 600px) and (max-width: 1000px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 250px) {
  }
  font-family: 'Pragati Narrow', sans-serif;
  text-align: center;
  text-shadow: -1px 2px 3px rgba(0, 0, 0, 0.208);
`;

const Main = styled.main`
  display: grid;
  @media screen and (min-width: 1001px) {
    font-size: 2rem;
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 600px) and (max-width: 1000px) {
    font-size: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 599px) {
    font-size: 1.5rem;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 250px) {
    grid-template-columns: 1fr;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  button {
    flex: 1 1 0;
    margin: 1rem 2rem;
    font-size: 1.15rem;
    border: none;
    font-weight: bold;
    padding: 0.336rem;
    background-color: #38754c;
    color: #f6f6f6;
    border-radius: 3px;

    &:hover {
      background-color: #1f422b;
    }
  }
`;

function Weapons(): JSX.Element {
  const [weapons, setWeapons] = useState<WeaponInfo['data']>([]);
  const [error, setError] = useState<boolean>(false);

  // getting page
  const [searchParams, setSearchParams] = useSearchParams();
  const [lastPage, setLastPage] = useState<number>(0);
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
    setPage(p);
    async function weaponsFn(): Promise<void> {
      const response = await fetch(`/weapons/api?page=${p}`);

      if (response.status !== 200) {
        return setError(true);
      }
      const items: WeaponInfo = await response.json();
      setLastPage(items.pagination.lastVisiblePage);
      return setWeapons([...items.data]);
    }
    weaponsFn();
  }, [page, searchParams]);

  return (
    <div>
      {error && <h2 className="error">Item not found</h2>}
      <Title data-testid="weapon-d-title">Weapons</Title>
      {weapons.length >= 1 ? (
        <Main>
          {weapons.map((val) => (
            <Card key={val.name} title={val.name} imagePath={val.imagePath} />
          ))}
        </Main>
      ) : (
        <p>Page not found</p>
      )}
      <Buttons>
        {page > 1 && (
          <button
            type="button"
            onClick={() => {
              if (page > 1) {
                // scrolls page to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              changePage('-');
            }}
          >
            Previous
          </button>
        )}
        {page < lastPage && (
          <button
            type="button"
            data-testid="weapons-next-page"
            onClick={() => {
              if (page < lastPage) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              changePage('+');
            }}
          >
            Next
          </button>
        )}
      </Buttons>
    </div>
  );
}

export default Weapons;
