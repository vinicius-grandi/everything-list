import React from 'react';
import styled from 'styled-components';
import { Search, Menu } from 'react-feather';
import './index.css';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import Weapons from './views/Weapons';
import SearchBar from './components/SearchBar';
import Home from './views/Home';
import Signup from './views/Signup';

const Header = styled.header`
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

const Footer = styled.footer`
  background-color: #543275;
  color: #f6f6f6;
  padding: 0.15rem;
  p {
    margin-left: 0.5rem;
  }
`;

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header>
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
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/weapons?page=1" element={<Weapons />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer>
        <p>Made by Vinicius Grandi</p>
      </Footer>
    </BrowserRouter>
  );
}

export default App;
