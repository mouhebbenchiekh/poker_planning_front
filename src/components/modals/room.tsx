import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { axiosInstance } from '../../axios.config';
import { useSocket } from '../../context/socket';
import { actionRoom } from '../../types/modal';
import { IRoom, RoomType } from '../../types/room';
import Modal from '../room/modal';
interface Props {
  open: boolean;
  setOpen: (args: actionRoom) => void;
  room?: IRoom;
}
type Inputs = {
  name: string;
  type: string;
};

export const RoomModal: FC<Props> = (props) => {
  const socket = useSocket();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const mutation = useMutation(
    (args: Inputs) => {
      return axiosInstance.put(`/room/${props.room?._id}`, args);
    },
    {
      onSuccess: () => {
        props.setOpen({ type: 'open_room', payload: false });
        socket.emit('reload_room', props.room?._id);
      },
    }
  );
  const onSubmit: SubmitHandler<Inputs> = (args) => {
    mutation.mutate(args);
  };

  return (
    <Modal
      isOpen={props.open}
      closeModal={() => props.setOpen({ type: 'open_room', payload: false })}
      title='set room'
    >
      <div className='mt-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='username'
            >
              Room name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              defaultValue={props.room?.name}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className='text-red-500 text-xs italic'>
                Please choose a name for room.
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='grid-state'
            >
              Points type
            </label>
            <div className='relative'>
              <select
                defaultValue={props.room?.type}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                {...register('type', { required: true })}
              >
                <option value={RoomType.fibonachi}>Fibonachi</option>
                <option value={RoomType.regular}>Regular</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                ></svg>
              </div>
            </div>
            {errors.type && (
              <p className='text-red-500 text-xs italic'>
                Please choose a name for room.
              </p>
            )}
          </div>
          <button
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
