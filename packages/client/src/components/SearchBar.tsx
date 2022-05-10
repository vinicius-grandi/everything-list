import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { X } from 'react-feather';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '../contexts/SearchContext';
import DefaultImg from './DefaultImg';
import SearchLoading from './Search/SearchLoading';

const SearchList = styled.ul<{ w: string; d: string }>`
  margin: inherit;
  list-style-type: none;
  background-color: #331e47;
  color: #f6f6f6;
  display: ${({ d }) => d};
  grid-auto-flow: row;
  text-align: center;
  place-items: center;
  position: absolute;
  z-index: 1;
  min-width: ${({ w }) => `calc(${w}px - 10%)`};

  li {
    margin: 0.5rem;
  }

  svg {
    cursor: pointer;
  }

  .search-loading {
    margin: 3rem;
  }

  max-width: 50%;
`;

const QueryCard = styled.li`
  background-color: #663a8f;
  padding: 0.3rem;
  width: 100%;
  box-shadow: -3px 6px 3px #00000045;

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

const SearchBar = forwardRef<
  HTMLInputElement,
  {
    elem: React.RefObject<HTMLInputElement>;
  }
>(({ elem }, ref) => {
  const [search, setSearch] = useState<string>('');
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [listWidth, setListWidth] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchListDisplay, setSearchListDisplay] = useState<'grid' | 'none'>(
    'none',
  );
  const { setQueryRes, queryRes, filter } = useQuery();

  useEffect(() => {
    const handleResize = (): void => {
      if (elem.current) {
        setListWidth(String(elem.current.clientWidth));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [elem]);
  useEffect(() => {
    const timeout = 3000;
    if (search.length === 0) {
      return setQueryRes([]);
    }

    async function handleSearch(): Promise<void> {
      try {
        setLoading(true);
        const response = await fetch(
          `/search/api?q=${search}${filter ? `&f=${filter}` : ''}`,
          {
            referrerPolicy: 'no-referrer',
          },
        );
        const searchResult = await response.json();
        setQueryRes(searchResult);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setQueryRes([]);
          setLoading(false);
        }
      }
    }

    const to = setTimeout(() => handleSearch(), timeout);
    return () => clearTimeout(to);
  }, [filter, search, setQueryRes]);

  return (
    <div className="search-box" data-cy="full-search">
      <div className="search-bar" role="search">
        <input
          ref={ref}
          type="text"
          onChange={(ev) => setSearch(ev.target.value)}
          onClick={() => setSearchListDisplay('grid')}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter' && searchButtonRef.current) {
              searchButtonRef.current.click();
            }
          }}
          role="searchbox"
          data-cy="searchbox"
          value={search}
        />
        <Link to={`/search?q=${search}`}>
          <SearchButton
            type="button"
            data-testid="search-btn"
            ref={searchButtonRef}
            onClick={() => setSearchListDisplay('none')}
            onTouchStart={() => setSearchListDisplay('none')}
          >
            Search
          </SearchButton>
        </Link>
      </div>
      <SearchList
        data-testid="search-list"
        className="search-list"
        w={
          Number(listWidth) === 0
            ? String(elem.current?.clientWidth)
            : listWidth
        }
        d={searchListDisplay}
      >
        {queryRes.length >= 1 && (
          <li>
            <X onClick={() => setSearchListDisplay('none')} />
          </li>
        )}
        {loading && (
          <li className="search-loading">
            <SearchLoading />
          </li>
        )}
        {queryRes.length >= 1 &&
          queryRes.map((val) => (
            <QueryCard key={`${val?.list_name}-${val?.id}`}>
              <p>
                {'List: '}
                <Link to={`${val?.list_name}`}>{val?.list_name}</Link>
              </p>
              <DefaultImg src={val?.imagePath ?? ''} alt={val?.name ?? ''} />
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
    </div>
  );
});

export default SearchBar;
