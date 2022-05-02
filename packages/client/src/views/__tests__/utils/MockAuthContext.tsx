import React from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

function MockAuthContext({
  status,
  children,
}: {
  status: number;
  children: JSX.Element;
}): JSX.Element {
  const auth = false;
  const value = React.useMemo(
    () => ({
      auth,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      login: (): Promise<any> =>
        Promise.resolve({
          json: () => Promise.resolve(),
          status,
        }),
    }),
    [auth, status],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default MockAuthContext;
