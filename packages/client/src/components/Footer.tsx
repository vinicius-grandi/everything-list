import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #543275;
  color: #f6f6f6;
  padding: 0.15rem;
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  p {
    margin-left: 0.5rem;
  }
`;

function Footer(): JSX.Element {
  return <StyledFooter>Site created by Vinicius Grandi</StyledFooter>;
}

export default Footer;
