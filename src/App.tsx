import * as React from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Cookies, { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  UNSAFE_RouteContext,
} from 'react-router-dom';
import { IUser } from './context/auth';
import { userContext } from './context/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGetUser } from './hooks/useGetUser';

const AuthenticatedApp = React.lazy(() => import('./authenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticatedApp'));

function App() {
  const [userV, setUserV] = React.useState<IUser | undefined>(undefined);
  const token = localStorage.getItem('token');
  const { user } = useGetUser();
  console.log({ user });

  return (
    <GoogleOAuthProvider clientId='578500318926-m0qaca6s3ifu50i4d8vnsmegq8ij8rh9.apps.googleusercontent.com'>
      <userContext.Provider value={{ user: userV, setUser: setUserV }}>
        <React.Suspense fallback={<>fallback</>}>
          <Router>
            <Routes>
              <Route
                path='*'
                element={user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
              />
            </Routes>
          </Router>
        </React.Suspense>
      </userContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
