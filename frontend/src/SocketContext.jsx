import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "./socket.jsx";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = getSocket();
    setSocket(s);

    return () => {
      // DO NOT disconnect on route change
      // disconnect only on tab close / logout
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);