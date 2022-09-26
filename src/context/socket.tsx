import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React, { PropsWithChildren, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { axiosInstance } from '../axios.config';

const socket = io(import.meta.env.VITE_SOCKET_BACKEND_URL);

const SocketContext = React.createContext<Socket>(socket);

const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const context = React.useMemo(() => socket, [socket]);

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

function useSocket() {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { SocketProvider, useSocket };
