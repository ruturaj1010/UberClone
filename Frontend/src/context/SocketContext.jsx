import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";
export const SocketDataContext = createContext();

const socketUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
const socket = io(socketUrl, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

const SocketContext = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });

    }, []);

    return (
        <SocketDataContext.Provider value={{ socket }}>
            {children}
        </SocketDataContext.Provider>
    );
};

export default SocketContext;
