import { RenderResult, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (
  ui: JSX.Element,
  { route = '/' } = {},
): RenderResult => {
  window.history.pushState({ page: 'signup' }, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

export default renderWithRouter;
