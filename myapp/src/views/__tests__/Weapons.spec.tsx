import React from 'react';
import { render, screen } from '@testing-library/react';
import Weapons from '../Weapons';

describe('Weapons', () => {
  it('should get items from wikiapi', () => {
    render(<Weapons />);

    const element = screen.getByText(/Battle axe/gi);

    expect(element).toBeInTheDocument();
  });
});
