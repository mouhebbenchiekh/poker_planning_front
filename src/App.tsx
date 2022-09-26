import * as React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/auth';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { SocketProvider } from './context/socket';

const AuthenticatedApp = React.lazy(() => import('./authenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticatedApp'));

function App() {
  const { user } = useAuth();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      <SocketProvider>
        <React.Suspense fallback={<>fallback</>}>
          <Routes>
            <Route
              path='*'
              element={user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            />
          </Routes>
        </React.Suspense>
      </SocketProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
