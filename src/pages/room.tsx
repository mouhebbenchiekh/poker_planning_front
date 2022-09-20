import { FC, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Bar from '../components/room/bar';
import Modal from '../components/room/modal';
import PointsBar from '../components/room/points';
import Result from '../components/room/result';
import { useEnterRoom } from '../hooks/useEnterRoom';
import { RoomType } from '../types/room';
import { RefreshIcon } from '@heroicons/react/outline';

interface Props {
  socket: Socket;
}
export const Room: FC<Props> = ({ socket }) => {
  const {
    user,
    open,
    setOpen,
    location,
    users,
    username,
    setUserName,
    isLoading,
    room,
    userId,
  } = useEnterRoom(socket);
  const [value, setValue] = useState('');

  const [input, setInput] = useState(username ? username : '');
  const [error, setError] = useState(false);

  useEffect(() => {
    socket.emit('send_value', {
      room: location.pathname.substring(1),
      username,
      value,
      userId,
    });
  }, [value]);

  if (isLoading) return <>is Loading ...</>;
  return (
    <>
      <Bar
        user={username}
        room={room?.name}
        changeName={() => {
          setOpen(true);
        }}
      />
      <div className='w-full flex justify-start items-center mt-4 ml-4'>
        <button
          onClick={() => {
            socket.emit('newStory', { room: room?._id });
          }}
          className='group relative w-max gap-1 flex uppercase justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-white border-indigo-600 text-indigo-600 hover:bg-slate-200 mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <RefreshIcon className='w-6 h-6' /> new story
        </button>
      </div>
      <Modal
        isOpen={open}
        closeModal={() => {
          if (username) setOpen(false);
        }}
        title='set username'
      >
        <div className='mt-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            user name:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          {error && input.length <= 0 && (
            <p className='text-red-500 text-xs italic'>
              Please choose a username.
            </p>
          )}
        </div>
        <div className='mt-4'>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            onClick={() => {
              if (!input.length) {
                setError(true);
              } else {
                setUserName(input);
                setOpen(false);
              }
            }}
          >
            Got it, thanks!
          </button>
        </div>
      </Modal>

      <Result users={users} admin={user ? true : false} socket={socket} />
      <PointsBar type={RoomType.fibonachi} setPoint={setValue} />
    </>
  );
};
