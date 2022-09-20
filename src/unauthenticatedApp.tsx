import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Login from './components/login';
import { Room } from './pages/room';

const UnauthenticatedApp: React.FC<{ socket: Socket }> = (props) => (
  <Routes>
    <Route path='/:id' element={<Room socket={props.socket} />} />

    <Route path='/' element={<Login />} />
  </Routes>
);

export default UnauthenticatedApp;
