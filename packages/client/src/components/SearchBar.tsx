import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '../contexts/SearchContext';

const SearchList = styled.ul<{ w: string }>`
  margin: inherit;
  padding: 1rem;
  list-style-type: none;
  background-color: #331e47;
  color: #f6f6f6;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 1fr;
  text-align: center;
  place-items: center;
  position: absolute;
  z-index: 5;
  min-width: ${({ w }) => w}px;
`;

const QueryCard = styled.li`
  background-color: #663a8f;
  padding: 0.3rem;
  width: 100%;

  a {
    text-decoration: none;
    font-weight: 600;
    color: #f6f6f6;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SearchButton = styled.button`
  border: 2px solid #161616;
  border-radius: 5px;
  padding: 0.5rem;
  background-color: #331e47;
  color: #f6f6f6;
  position: relative;
  z-index: 1;
  width: fit-content;

  &:hover {
    background-color: #663a8f;
    cursor: pointer;
  }
  @media screen and (max-width: 599px) {
    font-size: 0.5rem;
  }
`;

const SearchBar = forwardRef<HTMLInputElement>((_, ref) => {
  const [search, setSearch] = useState<string>('');
  const elem = useRef<HTMLDivElement>(null);
  const { setQueryRes, queryRes, filter } = useQuery();

  useEffect(() => {
    const timeout = 3000;
    if (search.length === 0) {
      return setQueryRes([]);
    }

    async function handleSearch(): Promise<void> {
      try {
        const response = await fetch(
          `/search/api?q=${search}${filter ? `&f=${filter}` : ''}`,
          {
            referrerPolicy: 'no-referrer',
          },
        );
        const searchResult = await response.json();
        setQueryRes(searchResult);
      } catch (error) {
        if (error instanceof Error) {
          setQueryRes([]);
        }
      }
    }

    const to = setTimeout(() => handleSearch(), timeout);
    return () => clearTimeout(to);
  }, [filter, search, setQueryRes]);

  return (
    <div className="search-box" data-cy="full-search">
      <div className="search-bar" role="search" ref={elem}>
        <input
          ref={ref}
          type="text"
          onChange={(ev) => setSearch(ev.target.value)}
          role="searchbox"
          data-cy="searchbox"
          value={search}
        />
        <Link to={`/search?q=${search}`}>
          <SearchButton type="button" data-testid="search-btn">
            Search
          </SearchButton>
        </Link>
      </div>
      {queryRes.length !== 0 && (
        <SearchList
          data-testid="search-list"
          className="search-list"
          w={(elem.current && String(elem.current.clientWidth)) ?? 'initial'}
        >
          {queryRes.map((val) => (
            <QueryCard key={`${val?.list_name}-${val?.id}`}>
              <p>
                {'List: '}
                <Link to={`${val?.list_name}`}>{val?.list_name}</Link>
              </p>
              <img
                src={
                  val?.imagePath ??
                  'https://via.placeholder.com/140x200?text=no+image'
                }
                alt={val?.name}
              />
              <p>
                <Link
                  to={`${val?.list_name}/${val?.id}`}
                  onClick={() => {
                    setTimeout(() => setSearch(''), 500);
                  }}
                >
                  {val?.name}
                </Link>
              </p>
            </QueryCard>
          ))}
        </SearchList>
      )}
    </div>
  );
});

export default SearchBar;
