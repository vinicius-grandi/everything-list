import { createGlobalStyle } from 'styled-components';

type OverflowValue = {
  overflowHidden?: boolean;
};

const GlobalStyles = createGlobalStyle<OverflowValue>`
  :root {
    --darkG: #3b8955;
    --lightG: #53c278;
    --lightestG: #b5c5bb;
    --lightP: #543275;
    --darkP: #332164;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    color: #1f422b;
    background-color: hsla(36, 42%, 51%, 0.514);
    width: 100vw;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: ${({ overflowHidden }) =>
      overflowHidden ? 'hidden' : 'initial'};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .error {
    background-color: #e78f8f;
    color: #811212;
    width: 100%;
    margin: 0 !important;
    padding: 0.25rem;
  }
`;

export default GlobalStyles;
