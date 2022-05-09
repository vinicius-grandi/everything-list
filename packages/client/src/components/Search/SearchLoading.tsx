import React from 'react';
import { Circle } from 'react-feather';
import styled from 'styled-components';

const Container = styled.div`
  @keyframes left-to-right {
    0% {
      transform: translateX(-100px);
    }
    25% {
      filter: blur(px);
    }
    50% {
      transform: translateX(100px);
    }
    100% {
      filter: blur(2px);
      transform: translateX(-100px);
      opacity: 0.25;
    }
  }

  svg {
    animation: left-to-right infinite ease-out 2s;
  }

  .second {
    animation: left-to-right infinite 2s ease-out 0.25s;
  }
  .third {
    animation: left-to-right infinite 2s ease-out 0.5s;
  }

  position: absolute;
`;

function SearchLoading(): JSX.Element {
  return (
    <Container>
      <Circle color="#060606" fill="#f6f6f6" />
      <Circle color="#060606" fill="var(--lightG)" className="second" />
      <Circle color="#060606" fill="var(--lightP)" className="third" />
    </Container>
  );
}

export default SearchLoading;
