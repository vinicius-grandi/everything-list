import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './App';
import AuthProvider from './contexts/AuthContext';

render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root'),
);
