import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import { IUser, userContext } from './context/auth';

const AuthenticatedApp = () => {
  const { user } = React.useContext(userContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<> welcome {user?.email}</>} />;
      </Routes>
    </>
  );
};

export default AuthenticatedApp;
