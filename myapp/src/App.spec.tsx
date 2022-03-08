import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
  it('should render weapons list', () => {
    render(<App />);

    const component = screen.getByText(/weapons/gi);

    expect(component).toBeInTheDocument();
  });
});
