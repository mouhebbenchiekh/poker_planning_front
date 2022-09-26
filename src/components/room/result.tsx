import { FC, useEffect, useState } from 'react';
import { useSocket } from '../../context/socket';
import { IRoom } from '../../types/room';
import { ISocketUser } from '../../types/socket';
import ResultCard from './resultCard';
interface Props {
  admin?: boolean;
  users: ISocketUser[];
  room?: IRoom;
}
const Result: FC<Props> = (props) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const socket = useSocket();
  useEffect(() => {
    socket.on('flip', (face) => {
      setFlipped(face);
      // setFlipped(true);
    });
    return () => {
      socket.off('flip');
    };
  }, [socket]);
  return (
    <div className='w-full h-3/4 flex flex-col justify-center items-center gap-4'>
      <div className='w-1/3 bg-slate-400 h-20 rounded-md flex justify-center items-center'>
        <button
          className='group relative w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-white border-indigo-600 text-indigo-600 hover:bg-slate-200 mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={() => {
            if (props.admin)
              socket.emit('flip_cards', {
                room: props.room?._id,
                face: true,
              });
          }}
        >
          reveal results
        </button>
      </div>
      <div className='w-full h-20 gap-4 flex flex-row items-center justify-center flex-wrap'>
        {props.users?.map((ele) => {
          return (
            <ResultCard
              me={ele.id === socket.id}
              flipped={flipped}
              key={ele.id}
              {...ele}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Result;
