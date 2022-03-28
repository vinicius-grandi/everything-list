import React from 'react';
// import renderWithRouter from '../../views/__tests__/utils/renderWithRouter';
import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('Animes', () => {
  it('should get info from backend', async () => {
    render(<SearchBar />);
    const element = screen.findAllByText('jojo');
    expect(element).toBeInTheDocument();
  });
});
