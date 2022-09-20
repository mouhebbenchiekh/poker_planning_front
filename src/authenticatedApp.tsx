import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import Navbar from './components/navbar';
import { useAuth } from './context/auth';
import { Room } from './pages/room';
import WelcomePage from './pages/welcome';

const AuthenticatedApp: React.FC<{ socket: Socket }> = (props) => {
  const { user } = useAuth();

  return (
    <div className='h-screen'>
      <Navbar />
      <Routes>
        <Route path='/:id' element={<Room socket={props.socket} />} />
        <Route path='/' element={<WelcomePage />} />;
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
