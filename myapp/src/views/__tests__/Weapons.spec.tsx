import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderResult, screen } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
  const renderWithRouter = (
    ui: JSX.Element,
    { route = '/' } = {},
  ): RenderResult => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };
  it('should show next page when there are more than 20 items', () => {
    renderWithRouter(<App />, { route: '/weapons' });

    const component = screen.getByTestId('weapons-next-page');

    expect(component).toBeInTheDocument();
  });
});
