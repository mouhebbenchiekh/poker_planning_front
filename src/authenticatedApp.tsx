import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { IUser } from './context/auth';
type Props = {
  user?: IUser;
};

const AuthenticatedApp = (props: Props) => {
  console.log({ user: props.user });
  return (
    <Routes>
      <Route path='/welcome' element={<> welcome</>} />;
    </Routes>
  );
};

export default AuthenticatedApp;
