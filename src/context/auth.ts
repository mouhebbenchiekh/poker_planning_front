import React from 'react';

export interface IUser {
  id: number;
  first_name: String;
  last_name: String;
  email: String;
  password: String;
}

type userContext = {
  user?: IUser;
  setUser: (user?: IUser) => void;
};

export const userContext = React.createContext<userContext>({
  user: undefined,
  setUser: () => {},
});
