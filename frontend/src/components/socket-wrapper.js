import { SocketContext } from "../context";
import socketIOClient from "socket.io-client";
import config from "../utils/config/cfg";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// slices
import * as messageActions from "../pages/message/slice";

function SocketWrapper({ children }) {
    const token = localStorage.getItem("token");

    const socket = useMemo(() => {
        if (token) {
            return socketIOClient(config[config.environment].originBackend, { query: { token } });
        }
        return null;
    }, [token]);

    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("receive-msg", (data) => {
            const msg = data;
            dispatch(messageActions.appendMessage(msg));
        });

        return () => socket.disconnect();
    }, []);

    return (
        <>
            <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
        </>
    );
}

export default SocketWrapper;
