import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import { Room } from './pages/room';
import WelcomePage from './pages/welcome';

const AuthenticatedApp: React.FC = () => {
  return (
    <div className='h-full flex flex-col'>
      <Navbar />
      <Routes>
        <Route path='/:id' element={<Room />} />
        <Route path='/' element={<WelcomePage />} />;
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
