import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login';

const UnauthenticatedApp: React.FC = (...props) => (
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/:id' element={<>welcome to ROOM</>} />
  </Routes>
);

export default UnauthenticatedApp;
