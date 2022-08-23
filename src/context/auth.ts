import React from 'react';

export interface IUser {
  id: number;
  family_name: string;
  given_name: string;
  email: string;
}

type userContext = {
  user?: IUser;
  setUser: (user?: IUser) => void;
};

export const userContext = React.createContext<userContext>({
  user: undefined,
  setUser: () => {},
});
