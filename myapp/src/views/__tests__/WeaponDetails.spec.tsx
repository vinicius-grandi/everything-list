import React from 'react';
import { screen } from '@testing-library/react';
import Weapons from '../Weapons';
import renderWithRouter from './utils/renderWithRouter';

describe('App', () => {
  it('should render weapon card with title and image', async () => {
    const { findByText } = renderWithRouter(<Weapons />);

    const component = await findByText('Arbalest');

    expect(component).toBeInTheDocument();

    const titleElement = await screen.findAllByTestId('card-title');
    const imageElement = await screen.findAllByTestId('card-title');

    expect(titleElement[0]).toBeInTheDocument();
    expect(imageElement[0]).toBeInTheDocument();
  });
});
