import React, { useContext, createContext, useState } from 'react';

type Res = Promise<void | false | Response>;

export type AuthContextType = {
  auth: boolean | 'standby';
  login?(form: HTMLFormElement): Res;
  signup?(form: HTMLFormElement): Res;
  logout?(): Res;
};

export const AuthContext = createContext<AuthContextType>({
  auth: false,
});

function AuthProvider({
  children,
}: React.PropsWithChildren<{ children: JSX.Element }>): JSX.Element {
  const [auth, setAuth] = useState<boolean | 'standby'>('standby');

  React.useEffect(() => {
    async function getUserAuth(): Promise<void> {
      try {
        const response = await fetch('/api/is-user-auth', { method: 'get' });
        const { auth: isUserAuth }: { auth: boolean } = await response.json();
        return setAuth(isUserAuth);
      } catch (err) {
        return setAuth(false);
      }
    }
    getUserAuth();
  }, []);

  const fetchWithForm = React.useCallback(
    async (form: HTMLFormElement, input: RequestInfo): Res => {
      const response = await fetch(input, {
        method: 'POST',
        body: new FormData(form),
      });

      if (response.status === 200) {
        setAuth(true);
      }

      return response;
    },
    [],
  );

  const value = React.useMemo(
    () => ({
      auth,
      login: async (form: HTMLFormElement): Res => {
        return fetchWithForm(form, '/api/login');
      },
      signup: async (form: HTMLFormElement): Res => {
        return fetchWithForm(form, '/api/signup');
      },
      logout: async (): Res => {
        const response = await fetch('/api/logout');
        if (response.status === 200) {
          setAuth(false);
        }
        return response;
      },
    }),
    [auth, fetchWithForm],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const { auth, login, logout, signup } = useContext(AuthContext);
  return { auth, login, logout, signup };
};

export default AuthProvider;
