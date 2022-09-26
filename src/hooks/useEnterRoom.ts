import { useQuery } from '@tanstack/react-query';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Cookies from 'universal-cookie';
import { axiosInstance } from '../axios.config';
import { useAuth } from '../context/auth';
import { actionRoom, ModalRoom } from '../types/modal';
import { IRoom } from '../types/room';
import { ISocketUser } from '../types/socket';
const initialModal: ModalRoom = {
  username: false,
  room: false,
  share: false,
};

export const useEnterRoom = (socket: Socket) => {
  const { id: roomId } = useParams();
  const cookies = new Cookies();
  const name = cookies.get('name');
  const userId = cookies.get('userId');
  const [username, setUserName] = useState<string | undefined>(
    name === 'undefined' ? undefined : name
  );

  function modalReducer(state: ModalRoom, action: actionRoom) {
    switch (action.type) {
      case 'open_username':
        state = { ...state, username: action.payload };

        break;
      case 'open_room':
        state = { ...state, room: action.payload };

        break;
      case 'open_share':
        state = { ...state, share: action.payload };

        break;

      default:
        break;
    }
    return state;
  }

  const [openModal, setOpenModal] = useReducer(modalReducer, initialModal);

  const [users, setusers] = useState<ISocketUser[]>([]);
  const [room, setRoom] = useState<IRoom | undefined>(undefined);

  const { isLoading } = useQuery<IRoom>(
    ['room'],
    async () => {
      const result = await axiosInstance.get(`/room/${roomId}`);
      return result.data;
    },
    {
      onSuccess(data) {
        setRoom(data);
      },
    }
  );

  useEffect(() => {
    cookies.set('name', username, {
      path: `/${roomId}`,
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
    if (!userId) {
      cookies.set('userId', Math.floor(Math.random() * 9999), {
        path: `/${roomId}`,
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });
    }
  }, [username]);
  const { user } = useAuth();
  /*   if (!username)
    if (user) {
      setUserName(user.given_name);
    } */
  useEffect(() => {
    if (username === undefined) {
      if (user) {
        setUserName(user.given_name);
      } else setOpenModal({ type: 'open_username', payload: true });
    }
  }, []);

  useEffect(() => {
    if (username)
      socket.emit('join_room', {
        username,
        userId,
        room: roomId,
      });
    socket.on('reload', () => {
      window.location.reload();
    });

    socket.on('room_users', (roomUsers) => {
      setusers(roomUsers);
    });

    return () => {
      socket.off('room_users');
    };
  }, [username]);

  return {
    cookies,
    openModal,
    setOpenModal,
    setRoom,
    user,
    users,
    username,
    setUserName,
    room,
    isLoading,
    userId,
  };
};
