import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderResult, screen } from '@testing-library/react';
import App from '../../App';

jest.mock('../../services/weapons/wikiapi');

describe('App', () => {
  const renderWithRouter = (
    ui: JSX.Element,
    { route = '/' } = {},
  ): RenderResult => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };
  it('should show next page when there are more than 20 items', async () => {
    renderWithRouter(<App />, { route: '/weapons' });

    const component = await screen.findByText('armabraba');

    expect(component).toBeInTheDocument();
  });
});
