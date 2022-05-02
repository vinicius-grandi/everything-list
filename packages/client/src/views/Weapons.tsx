import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';
import type {
  WeaponInfo,
  weapons as WeaponsType,
} from '../services/weapons/wikiapi.d';
import Loading from '../components/Loading';

const Title = styled.h1`
  text-transform: capitalize;
  @media screen and (min-width: 1001px) {
    font-size: 3rem;
  }

  @media screen and (min-width: 600px) and (max-width: 1000px) {
    font-size: 2.5rem;
  }

  @media screen and (max-witdh: 250px) {
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
  const [weapons, setWeapons] = useState<WeaponsType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { pathname } = useLocation();
  const listName = pathname.slice(1);

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
    setWeapons([]);
    const p = Number(searchParams.get('page'));
    setPage(p < 1 ? 1 : p);
    async function weaponsFn(): Promise<void> {
      const response = await fetch(`/${listName}/api?page=${p}`);
      if (response.status !== 200) {
        return setError(true);
      }
      const items: WeaponInfo = await response.json();
      setLastPage(items.pagination.lastVisiblePage);
      return setWeapons([...items.data]);
    }
    weaponsFn();
  }, [page, searchParams, listName]);

  return (
    <main>
      {error && <h2 className="error">Item not found</h2>}
      <Title data-testid="weapon-d-title">{listName}</Title>
      {weapons.length >= 1 ? (
        <Main>
          {weapons.map((val) => (
            <Card
              key={`${val.name}-${val.id}`}
              title={val.name}
              imagePath={val.imagePath}
              id={val.id ?? 0}
              rating={val.rating ?? 0}
            />
          ))}
        </Main>
      ) : (
        <Loading size={100} />
      )}
      <Buttons>
        {page > 1 && (
          <button
            type="button"
            onClick={() => {
              setTimeout(
                () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                1000,
              );
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
              setTimeout(
                () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                1000,
              );
              changePage('+');
            }}
          >
            Next
          </button>
        )}
      </Buttons>
    </main>
  );
}

export default Weapons;
