import React, { useContext, createContext, useState } from 'react';

type AuthContextType = {
  auth: boolean;
  login?(form: HTMLFormElement): void;
  signup?(form: HTMLFormElement): void;
  logout?(): void;
};

const AuthContext = createContext<AuthContextType>({
  auth: false,
});

function AuthProvider({
  children,
}: React.PropsWithChildren<{ children: JSX.Element }>): JSX.Element {
  const [auth, setAuth] = useState<boolean>(false);
  const login = (form: HTMLFormElement): void => {
    fetch('/api/login', {
      method: 'POST',
      body: new FormData(form),
    }).then((res) => res.status === 200 && setAuth(true));
  };
  const signup = (form: HTMLFormElement): void => {
    fetch('/api/signup', {
      method: 'POST',
      body: new FormData(form),
    }).then((res) => res.status === 200 && setAuth(true));
  };
  const logout = (): void => {
    fetch('/api/logout').then((res) => res.status === 200 && setAuth(false));
  };

  const value = React.useMemo(
    () => ({
      auth,
      login,
      signup,
      logout,
    }),
    [auth],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const { auth, login, logout, signup } = useContext(AuthContext);
  return { auth, login, logout, signup };
};

export default AuthProvider;
