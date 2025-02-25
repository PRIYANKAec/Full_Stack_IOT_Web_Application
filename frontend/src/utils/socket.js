import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_APP_BACKEND_URL

const socket = io(SOCKET_SERVER_URL, {
    autoConnect: true,
    reconnection: true,
    transports: ['websocket', 'polling']
});

socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

export default socket;