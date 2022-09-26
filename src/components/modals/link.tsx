import { FC } from 'react';
import { actionRoom } from '../../types/modal';
import { IRoom } from '../../types/room';
import Modal from '../room/modal';
interface Props {
  open: boolean;
  setOpen: (args: actionRoom) => void;
  room?: IRoom;
}

export const LinkModal: FC<Props> = (props) => {
  const link = `${import.meta.env.VITE_FRONT_URL}/${props.room?._id}`;

  return (
    <Modal
      isOpen={props.open}
      closeModal={() => props.setOpen({ type: 'open_share', payload: false })}
      title='set room'
    >
      <div className='mt-4'>
        {/* register your input into the hook by invoking the "register" function */}

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Room Link:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            value={link}
            disabled
          />
        </div>

        <button
          type='button'
          onClick={() => {
            navigator.clipboard.writeText(link);
            props.setOpen({ type: 'open_share', payload: false });
          }}
          className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          Copy
        </button>
      </div>
    </Modal>
  );
};
