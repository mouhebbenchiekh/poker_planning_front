import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import { useAuth } from './context/auth';
import WelcomePage from './pages/welcome';

const AuthenticatedApp = () => {
  const { user } = useAuth();

  return (
    <div className='h-screen'>
      <Navbar />
      <Routes>
        <Route path='/' element={<WelcomePage />} />;
        <Route path='/:id' element={<>welcome to ROOM</>} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
