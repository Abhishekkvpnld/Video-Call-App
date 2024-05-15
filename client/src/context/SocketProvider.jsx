import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const socketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(socketContext);
    return socket;
};

export const SocketProvider = (props) => {
    const socket = useMemo(() => io("https://basic-video-call-app.onrender.com"), []);

    return (
        <socketContext.Provider value={socket}>
            {props.children}
        </socketContext.Provider>
    )

};