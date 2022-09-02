import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { IRoom } from '../types/room';

export const useWelcome = () => {
  const { user } = useAuth();
  const [rooms, setRomms] = useState<[IRoom] | []>([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}room/`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((result) => {
        console.log(result);
        setRomms(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { rooms, setRomms };
};
