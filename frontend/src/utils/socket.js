import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_APP_BACKEND_URL

const socket = io(SOCKET_SERVER_URL, {
    autoConnect: true,
    reconnection: true,
    transports: ['websocket', 'polling']
});

export default socket;