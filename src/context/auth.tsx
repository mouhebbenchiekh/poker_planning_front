import axios from 'axios';
import React, { PropsWithChildren, useEffect } from 'react';
import ErrorBoundary from '../errorBoundary';

export interface IUser {
  id: number;
  family_name: string;
  given_name: string;
  email: string;
}

type authContextType = {
  user?: IUser;
  setUser: (user?: IUser) => void;
  LoginSuccess: (callback_url: string) => void;
};

const AuthContext = React.createContext<authContextType | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && !user) {
      axios
        .get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((result) => {
          setUser(result.data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }, [token]);

  const LoginSuccess = (callback_url: string) => {
    axios
      .get(callback_url)
      .then((result) => {
        setUser(result?.data?.data);
        localStorage.setItem('token', result.data.token);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const context = React.useMemo(
    () => ({
      user,
      setUser,
      LoginSuccess,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
