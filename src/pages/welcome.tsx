import axios from 'axios';
import React from 'react';
import CreateRoomModal from '../components/forms/createRoomModal';
import List from '../components/lists/list';
import ListItem from '../components/lists/listItem';
import { useWelcome } from '../hooks/useWelcome';

const WelcomePage: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);

  const { rooms } = useWelcome();
  return (
    <>
      {showModal ? <CreateRoomModal setShowModal={setShowModal} /> : null}
      <div className='flex flex-col items-center h-full gap-4'>
        {' '}
        <div className='flex flex-col justify-center items-center h-1/3 gap-4'>
          <h1 className='font-bold text-3xl'>
            Scrum Poker for agile development teams
          </h1>
          <p className='text-base'>
            Have fun while being productive with our simple and complete tool.
          </p>
          <button
            onClick={() => setShowModal(true)}
            type='button'
            className='group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md bg-white border-indigo-600 text-indigo-600 hover:bg-slate-200 mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Start new room
          </button>
        </div>
        <h1 className='font-bold text-xl '>Your Rooms:</h1>
        <List>
          {rooms.map((ele) => (
            <ListItem key={ele._id} {...ele} />
          ))}
        </List>
      </div>
    </>
  );
};

export default WelcomePage;
