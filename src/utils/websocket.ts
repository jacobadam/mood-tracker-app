import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

type Mood = {
  id: number;
  type: "SAD" | "EXCITED" | "PLEASANT";
  createdAt: string;
};

export const connectWebSocket = (onNewMood?: (mood: Mood) => void): void => {
  if (!socket) {
    socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("new-mood", (data: Mood) => {
      console.log("New mood received:", data);
      onNewMood?.(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("connect_error", (err: Error) => {
      console.error("WebSocket connection error:", err.message);
    });
  }
};

export const disconnectWebSocket = (): void => {
  if (socket) {
    socket.disconnect();
    console.log("Disconnected from WebSocket server");
    socket = null;
  }
};
