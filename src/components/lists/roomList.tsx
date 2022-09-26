import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function RoomList({ children }: Props) {
  return <ul className='divide-y divide-slate-400 w-1/2'>{children}</ul>;
}
