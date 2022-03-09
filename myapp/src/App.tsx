import React from 'react';
import './index.css';
import { Route, Routes, HashRouter, Link } from 'react-router-dom';
import Weapons from './views/Weapons';

const App = (): JSX.Element => (
  <HashRouter>
    <ul>
      <li>
        <Link to="/weapons">uiu</Link>
      </li>
    </ul>
    <Routes>
      <Route path="/weapons" element={<Weapons />} />
      <Route path="/weapons?page=1" element={<Weapons />} />
    </Routes>
  </HashRouter>
);

export default App;
