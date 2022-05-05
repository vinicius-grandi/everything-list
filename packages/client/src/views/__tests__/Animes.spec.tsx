import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../../App';

describe('Animes', () => {
  it("should render weapon's details with title, image and rating", async () => {
    const { findByText } = renderWithRouter(<App />);
    expect(await findByText('!NVADE SHOW!')).toBeInTheDocument();
  });
});
