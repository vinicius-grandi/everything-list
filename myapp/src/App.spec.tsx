import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderResult, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const renderWithRouter = (
    ui: JSX.Element,
    { route = '/' } = {},
  ): RenderResult => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };
  it('should render weapons list', () => {
    renderWithRouter(<App />, { route: '/weapons' });

    const component = screen.getByText(/weapons/gi);

    expect(component).toBeInTheDocument();
  });
});
