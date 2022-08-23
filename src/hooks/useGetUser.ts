import { useContext, useEffect, useReducer, useState } from 'react';
import { IUser, userContext } from '../context/auth';
import axios, { AxiosError } from 'axios';

export const useGetUser = () => {
  const { user, setUser } = useContext(userContext);
  const [state, setState] = useState<IUser | undefined>();
  if (user) {
    setState(user);
  }
  const token = localStorage.getItem('token');
  if (!token) {
    setState(undefined);
  }
  useEffect(() => {
    axios
      .get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((result) => {
        setUser(result?.data);
        setState(result?.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, [token]);

  return { user: state };
};
