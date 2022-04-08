import React, { useContext, createContext, useState } from 'react';

type AuthType = React.Dispatch<React.SetStateAction<boolean>>;
const defaultAuth: AuthType = () => false;

type AuthContextType = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: defaultAuth,
});

function AuthProvider({
  children,
}: React.PropsWithChildren<{ children: JSX.Element }>): JSX.Element {
  const [auth, setAuth] = useState<boolean>(false);

  const value = React.useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const { auth, setAuth } = useContext(AuthContext);
  return { auth, setAuth };
};

export default AuthProvider;
