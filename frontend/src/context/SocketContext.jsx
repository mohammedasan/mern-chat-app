// src/context/SocketContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // ✅ Connect to backend Socket.IO server with userId
      const socketInstance = io("https://mern-chat-app-2-d3k2.onrender.com", {
        query: { userId: authUser._id },
        withCredentials: true, // ✅ Important for cookies (auth)
      });

      setSocket(socketInstance);

      // ✅ Listen for online users
      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // ✅ Clean up on unmount or logout
      return () => {
        socketInstance.close();
        setSocket(null);
      };
    } else {
      // If not logged in, ensure no lingering socket
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
