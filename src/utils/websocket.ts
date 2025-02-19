import { io, Socket } from "socket.io-client";
import { Mood } from "../types/mood-types";

let socket: Socket | null = null;

export const connectWebSocket = (
  onNewMood?: (mood: Mood) => void,
  onDeleteMood?: (id: number) => void
): void => {
  if (!socket) {
    socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("moodAdded", (data: Mood) => {
      console.log("New mood received:", data);
      onNewMood?.(data);
    });

    socket.on("moodDeleted", (data: { id: number }) => {
      console.log("Mood deleted:", data.id);
      onDeleteMood?.(data.id);
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
