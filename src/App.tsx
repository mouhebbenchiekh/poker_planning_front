import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/auth';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { io } from 'socket.io-client';
import { Room } from './pages/room';

const AuthenticatedApp = React.lazy(() => import('./authenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticatedApp'));

function App() {
  const { user } = useAuth();
  const socket = io('http://localhost:3000');

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      <React.Suspense fallback={<>fallback</>}>
        <Router>
          <Routes>
            <Route
              path='*'
              element={
                user ? (
                  <AuthenticatedApp socket={socket} />
                ) : (
                  <UnauthenticatedApp socket={socket} />
                )
              }
            />
          </Routes>
        </Router>
      </React.Suspense>
    </GoogleOAuthProvider>
  );
}

export default App;
