import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ISocketUser } from '../../types/socket';
import ResultCard from './resultCard';
interface Props {
  admin?: boolean;
  users: ISocketUser[];
  socket: Socket;
}
const Result: FC<Props> = (props) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  useEffect(() => {
    props.socket.on('flip', () => {
      console.log('flip');
      setFlipped((prevState) => !prevState);
      // setFlipped(true);
    });
    return () => {
      props.socket.off('flip');
    };
  }, [props.socket]);
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
      <div className='w-1/3 bg-slate-400 h-20 rounded-md flex justify-center items-center'>
        <button
          className='group relative w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-white border-indigo-600 text-indigo-600 hover:bg-slate-200 mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={() => {
            console.log(props.socket.id, 'id socket');
            if (props.admin)
              props.socket.emit('flip_cards', { room: props.users[0].room });
          }}
        >
          reveal results
        </button>
      </div>
      <div className='w-full h-20 gap-4 flex flex-row items-center justify-center flex-wrap'>
        {props.users?.map((ele, index) => {
          return (
            <>
              <ResultCard
                me={ele.id === props.socket.id}
                flipped={flipped}
                key={ele.id}
                {...ele}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Result;
