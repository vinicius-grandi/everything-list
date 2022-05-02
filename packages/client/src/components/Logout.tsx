import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Logout(): JSX.Element {
  const { logout: logoutMethod } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function logout(): Promise<void> {
      if (logoutMethod) {
        const response = await logoutMethod();
        if (response instanceof Response && response.status === 200) {
          navigate('/', {
            replace: true,
          });
        }
      }
    }
    logout();
  });

  return <h1>Logging out</h1>;
}

export default Logout;
