import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ShareIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
interface Props {
  user?: string;
  room?: string;
  onChangeName: () => void;
  onChangeRoom: () => void;
  onShareLink: () => void;
}
const Bar: React.FC<Props> = (props) => {
  const location = useLocation();
  const context = useAuth();
  return (
    <div className='w-full bg-slate-50 flex flex-row justify-between items-center h-16 shadow-gray-600 shadow-sm px-8'>
      {
        //} <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='inline-flex uppercase w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-slate-900 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
              ROOM :{props.room}
              <ChevronDownIcon
                className='ml-2 -mr-1 h-5 w-5 text-slate-900 hover:text-slate-500'
                aria-hidden='true'
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                      onClick={props.onChangeRoom}
                    >
                      change room details
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        // </div>
      }
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex uppercase w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-slate-900 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            Name :{props.user}
            <ChevronDownIcon
              className='ml-2 -mr-1 h-5 w-5 text-slate-900 hover:text-slate-500'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={props.onChangeName}
                    className={clsx(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    change username
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active ? 'bg-gray-100' : '',
                      ' w-full flex px-4 py-2 text-sm text-gray-700 justify-between'
                    )}
                    onClick={props.onShareLink}
                  >
                    share room link{' '}
                    <ShareIcon className='h-6 w-6 justify-self-end' />
                  </button>
                )}
              </Menu.Item>
            </div>
            {!context.user && (
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to={'/'}
                      state={{ prev: location.pathname }}
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      login
                    </NavLink>
                  )}
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default Bar;
