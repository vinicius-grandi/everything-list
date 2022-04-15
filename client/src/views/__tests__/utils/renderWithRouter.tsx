import React from 'react';
import { mount, MountReturn } from '@cypress/react';
import { RenderResult, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (
  ui: JSX.Element,
  { route = '/' } = {},
): RenderResult => {
  window.history.pushState({ page: 'signup' }, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

export const mountWithRouter = (
  ui: JSX.Element,
  { route = '/' } = {},
): globalThis.Cypress.Chainable<MountReturn> => {
  window.history.pushState({ page: 'signup' }, 'Test page', route);
  return mount(<BrowserRouter>{ui}</BrowserRouter>);
};

export default renderWithRouter;
