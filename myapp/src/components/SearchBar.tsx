import React, { ChangeEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type QueryItem = {
  list_name: string;
  id: number;
  name: string;
  imagePath: string | null;
} | null;

const SearchButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1.2rem;
  padding: 0.5rem;
  transform: translate(-140%, 0);
  background-color: #331e47;
  color: #f6f6f6;

  &:hover {
    background-color: #663a8f;
    cursor: pointer;
  }
`;

function SearchBar(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [queryItems, setQueryItems] = useState<QueryItem[]>([]);

  const handleSearch = async ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setSearch(value);
    try {
      const response = await fetch(`/search/api?q=${value}`, {
        referrerPolicy: 'no-referrer',
      });
      const searchResult = await response.json();
      setQueryItems(searchResult);
    } catch (error) {
      if (error instanceof Error) {
        setQueryItems([]);
      }
    }
  };

  return (
    <div className="search-bar" role="search">
      <input type="text" onChange={handleSearch} role="searchbox" />
      <Link to={`/search?q=${search}`}>
        <SearchButton type="button" data-testid="search-btn">
          Search
        </SearchButton>
      </Link>
      {queryItems.length !== 0 && (
        <ul data-testid="search-list">
          {queryItems.map((val) => (
            <li key={val?.id}>{val?.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
