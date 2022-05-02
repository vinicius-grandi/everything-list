import React from 'react';
import { Route } from 'react-router-dom';

function renderWithMultiplePath(
  paths: string[],
  elem: JSX.Element,
): JSX.Element[] {
  return paths.map((path) => <Route key={path} path={path} element={elem} />);
}

export default renderWithMultiplePath;
