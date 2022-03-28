import React, { useState } from 'react';
import styled from 'styled-components';

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
  const handleSearch = async (): Promise<void> => {
    try {
      const response = await fetch(`/search?q=${search}`, {
        referrerPolicy: 'no-referrer',
      });
      const searchResult = await response.json();
      console.log(searchResult);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <input
        type="text"
        onChange={(ev) => setSearch(ev.target.value)}
        className="search-bar"
      />
      <SearchButton type="button" onClick={handleSearch}>
        Search
      </SearchButton>
    </>
  );
}

export default SearchBar;
