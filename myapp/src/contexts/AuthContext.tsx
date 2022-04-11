import React, { useContext, createContext, useState } from 'react';

type AuthContextType = {
  auth: boolean | 'standby';
  login?(form: HTMLFormElement): Promise<Response | false | void>;
  signup?(form: HTMLFormElement): Promise<Response | false | void>;
  logout?(): void;
};

const AuthContext = createContext<AuthContextType>({
  auth: false,
});

function AuthProvider({
  children,
}: React.PropsWithChildren<{ children: JSX.Element }>): JSX.Element {
  type Res = Promise<void | false | Response>;

  const [auth, setAuth] = useState<boolean | 'standby'>('standby');

  React.useEffect(() => {
    async function getUserAuth(): Promise<void> {
      const response = await fetch('/api/is-user-auth', { method: 'get' });
      const { auth: isUserAuth }: { auth: boolean } = await response.json();
      if (isUserAuth === undefined) {
        setAuth(false);
      }
      setAuth(isUserAuth);
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
      logout: (): void => {
        fetch('/api/logout').then(
          (res) => res.status === 200 && setAuth(false),
        );
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
