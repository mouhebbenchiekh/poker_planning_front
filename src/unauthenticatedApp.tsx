import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import { Room } from './pages/room';

const UnauthenticatedApp: React.FC = () => (
  <Routes>
    <Route path='/:id' element={<Room />} />
    <Route path='/' element={<Login />} />
  </Routes>
);

export default UnauthenticatedApp;
