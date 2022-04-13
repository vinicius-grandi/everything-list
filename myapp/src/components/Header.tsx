import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'react-feather';
import SearchBar from './SearchBar';

type Searchbox = 'initial' | 'none';
type DisplayValue = {
  sbDisplay: Searchbox;
};

type TranslationValue = {
  translation: number;
};

const ExpandedMenu = styled.div<TranslationValue>`
  height: 200vh;
  flex-grow: 1!;
  width: 90%;
  position: absolute;
  z-index: 4;
  transform: translate(${({ translation }) => translation}%);
  background-color: #332164;
  transition: 0.5s;
  box-shadow: -20vw -2px #000000d9;

  svg {
    margin-top: 2rem;
    padding: 0.5rem;
  }

  ul {
    margin-top: 3rem;
    padding: 0;
    list-style-type: none;
    text-align: center;
  }

  a,
  li {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    height: fit-content;
    color: #f6f6f6;
    text-decoration: none;
  }

  li {
    background-color: #26184d;
    padding: 0.3rem;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledHeader = styled.header<DisplayValue>`
  height: 100px;
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
      display: ${({ sbDisplay }) => sbDisplay};
      flex-grow: 1;
    }

    a {
      max-width: 100%;
      width: 50%;
    }

    .search-box a {
      max-width: 100%;
      width: fit-content;
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

  #logo {
    display: ${({ sbDisplay }) =>
      sbDisplay === 'initial' ? 'none' : 'initial'};
  }

  .search-icon {
    margin: 0.5rem;
    display: ${({ sbDisplay }) =>
      sbDisplay === 'initial' ? 'none' : 'initial'};
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

function Header({
  setHidden,
}: {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [sbDisplay, setSbDisplay] = useState<Searchbox>('none');

  const dVTranslation = 130;
  const [translation, setTranslation] = useState<number>(dVTranslation);
  const searchBoxContainer = useRef<HTMLDivElement>(null);
  // capture all clicks on window to close search input when is required
  window.onclick = (ev) => {
    const elem = ev.target;

    if (
      (elem instanceof SVGElement && elem.classList[0] === 'search-icon') ||
      window.innerWidth > 598
    ) {
      return;
    }
    if (
      elem instanceof HTMLElement &&
      elem.getAttribute('role') === 'searchbox'
    ) {
      return;
    }
    if (searchBoxContainer.current) {
      setSbDisplay('none');
    }
  };
  return (
    <StyledHeader sbDisplay={sbDisplay}>
      <Link to="/" id="logo">
        <img
          src="images/EverythingList-logo.png"
          alt="header-logo"
          className="logo"
        />
      </Link>
      <SearchBar ref={searchBoxContainer} />
      <Search
        color="#f6f6f6"
        className="search-icon"
        data-cy="search-icon"
        onClick={() => {
          setSbDisplay('initial');
        }}
      />
      <ExpandedMenu data-cy="expanded-menu" translation={translation}>
        <ul>
          <Link to="/weapons">
            <li>Weapons</li>
          </Link>
          <Link to="/animes">
            <li>Animes</li>
          </Link>
        </ul>
        <X
          data-cy="menu-close-btn"
          color="#f6f6f6"
          onClick={() => {
            setTranslation(dVTranslation);
            setHidden(false);
          }}
        />
      </ExpandedMenu>
      <Menu
        color="#f6f6f6"
        className="menu-icon"
        data-cy="menu-icon"
        onClick={() => {
          setTranslation(10);
          setHidden(true);
        }}
      />
    </StyledHeader>
  );
}

export default Header;
