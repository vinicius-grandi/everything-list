import React from 'react';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../components/Header';

const Main = styled.main`
  margin: '2rem auto';
  width: 'fit-content';
  text-align: center;
`;

function Home(): JSX.Element {
  const navigation = useNavigate();
  return (
    <Main>
      <h1>Go to a Random List</h1>
      <FontAwesomeIcon
        icon={faDice}
        style={{ cursor: 'pointer' }}
        size="10x"
        onClick={() =>
          navigation(`${routes[Math.floor(Math.random() * routes.length)]}`, {
            replace: true,
          })
        }
      />
    </Main>
  );
}

export default Home;
