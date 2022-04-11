import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'react-feather';
import SearchBar from './SearchBar';

const StyledHeader = styled.header`
  @media screen and (min-width: 1001px) {
    .search-icon {
      display: none;
    }

    .search-bar,
    .search-box {
      flex-grow: 1;
      height: 1.7rem;
      margin: 0rem 2rem;
    }

    .search-bar input {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 1000px) {
    .search-icon {
      display: none;
    }

    .menu-icon {
      transform: scale(1.2);
    }

    .search-bar,
    .search-box {
      flex-grow: 1;
      height: 1.7rem;
      margin: 0rem 2rem;
    }
  }

  @media screen and (max-width: 599px) {
    .search-box {
      display: none;
    }

    a {
      max-width: 100%;
      width: 50%;
    }
  }

  background-color: #543275;
  display: flex;
  align-items: center;
  padding: 0.45rem;
  justify-content: space-between;

  img {
    max-width: 100%;
    height: auto;
  }

  .search-icon {
    margin: 0.5rem;
    &:hover {
      cursor: pointer;
      transform: rotate(90deg) scale(1.1);
      transition: 0.25s;
    }
  }

  .menu-icon {
    padding: 0.5rem;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
      background-color: #332164;
      transition: 0.25s;
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
  }

  .search-bar input {
    width: 100%;
    height: 80%;
  }
`;

function Header(): JSX.Element {
  return (
    <StyledHeader>
      <Link to="/">
        <img
          src="images/EverythingList-logo.png"
          alt="header-logo"
          className="logo"
        />
      </Link>
      <SearchBar />
      <Search color="#f6f6f6" className="search-icon" />
      <Menu color="#f6f6f6" className="menu-icon" />
    </StyledHeader>
  );
}

export default Header;
