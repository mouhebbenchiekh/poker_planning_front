import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Cookies from 'universal-cookie';
import { axiosInstance } from '../axios.config';
import { useAuth } from '../context/auth';
import { IRoom } from '../types/room';
import { ISocketUser } from '../types/socket';

export const useEnterRoom = (socket: Socket) => {
  const location = useLocation();
  const cookies = new Cookies();
  const name = cookies.get('name');
  const userId = cookies.get('userId');
  const [username, setUserName] = useState<string | undefined>(
    name === 'undefined' ? undefined : name
  );
  const [open, setOpen] = useState(false);
  const [users, setusers] = useState<ISocketUser[]>([]);

  const { data: room, isLoading } = useQuery<IRoom>(['room'], async () => {
    const result = await axiosInstance.get(`/room${location.pathname}`);
    return result.data;
  });

  useEffect(() => {
    cookies.set('name', username, {
      path: location.pathname,
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
    if (!userId) {
      cookies.set('userId', Math.floor(Math.random() * 9999), {
        path: location.pathname,
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });
    }
  }, [username]);
  const { user } = useAuth();
  if (!username)
    if (user) {
      setUserName(user.given_name);
    }
  useEffect(() => {
    console.log('username');
    if (username === undefined) {
      setOpen(true);
    }
    window.addEventListener('beforeunload', (eve) => {
      eve.preventDefault();
      console.log('leave');
      try {
        socket.emit('leave_room', {
          room: location.pathname.substring(1),
          userId,
        });
      } catch (error) {
        console.log({ error }, 'eroor socket');
      }
      return (eve.returnValue = 'Are you sure you want to exit?');
    });
    return () => {
      window.removeEventListener('beforeunload', (eve) => {
        eve.preventDefault();
        console.log('leave 2');
        try {
          socket.emit('leave_room', {
            room: location.pathname.substring(1),
            userId,
          });
        } catch (error) {
          console.log({ error }, 'eroor socket');
        }
        return (eve.returnValue = 'Are you sure you want to exit?');
      });
    };
  }, []);

  useEffect(() => {
    console.log('useeffect');
    if (username)
      socket.emit('join_room', {
        username,
        userId,
        room: location.pathname.substring(1),
      });

    socket.on('room_users', (roomUsers) => {
      console.log({ roomUsers });
      setusers(roomUsers);
    });

    return () => {
      console.log('return useeffect');

      socket.off('room_users');
    };
  }, [socket, username]);

  return {
    cookies,
    open,
    setOpen,
    user,
    users,
    username,
    location,
    setUserName,
    room,
    isLoading,
    userId,
  };
};
