import * as React from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  UNSAFE_RouteContext,
} from 'react-router-dom';
import { IUser } from './context/auth';
import { userContext } from './context/auth';

const AuthenticatedApp = React.lazy(() => import('./authenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticatedApp'));

function App() {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const authUser = React.useContext(userContext);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <React.Suspense fallback={<>fallback</>}>
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                authUser.user ? (
                  <AuthenticatedApp user={user} />
                ) : (
                  <UnauthenticatedApp />
                )
              }
            />
          </Routes>
        </Router>
      </React.Suspense>
    </userContext.Provider>
  );
}

export default App;
