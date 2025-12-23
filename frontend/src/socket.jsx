import { io } from "socket.io-client";

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      autoConnect: true,
    });
  }
  return socket;
}
