import React, { useState } from 'react';
import styled from 'styled-components';
import List from '../components/List';
import { Filters, filters, useQuery } from '../contexts/SearchContext';
import { routes } from '../components/Header';

const FiltersForm = styled.form`
  display: grid;
  padding: 1rem;
  color: #f6f6f6;
  background-color: var(--lightP);
  margin: 1rem;
  border-radius: 5px;
  box-shadow: -3px 3px 4px #00000057;
  label {
    margin: 0.8rem;
  }
  button {
    width: fit-content;
    border: none;
    font-weight: 700;
    border-radius: 5px;
    background-color: var(--lightG);
    justify-self: center;
    font-size: 1rem;
    padding: 0.236rem;
  }
  button:hover {
    background-color: var(--darkG);
    cursor: pointer;
  }
`;

const Title = styled.h1`
  margin: 1rem;
`;

function Search(): JSX.Element {
  const { queryRes, setFilter } = useQuery();
  const [fil, setFil] = useState<Filters>('');

  const handleForm = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    setFilter(fil);
  };

  return queryRes.length >= 1 ? (
    <main>
      <Title>Filters</Title>
      <FiltersForm onSubmit={handleForm}>
        {routes.map((route) => {
          const f = route.slice(1, 3);
          return (
            <label htmlFor={route} key={route}>
              <input
                type="radio"
                value={f}
                id={route}
                name="filter"
                onChange={({ target: { value } }) => {
                  const checkKey = (val: string): val is Filters =>
                    val in filters;

                  if (checkKey(value)) {
                    setFil(value);
                  }
                }}
              />
              {route.slice(1)}
            </label>
          );
        })}
        <button type="submit">SET FILTER</button>
      </FiltersForm>
      <List items={queryRes} />
    </main>
  ) : (
    <p className="error">Loading...</p>
  );
}

export default Search;
