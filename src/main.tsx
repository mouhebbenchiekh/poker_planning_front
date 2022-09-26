import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/auth';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Fragment>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </Fragment>
);
