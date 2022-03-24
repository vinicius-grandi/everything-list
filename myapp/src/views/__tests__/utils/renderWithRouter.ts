import { RenderResult, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (
  ui: JSX.Element,
  { route = '/' } = {},
): RenderResult => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

export default renderWithRouter;
