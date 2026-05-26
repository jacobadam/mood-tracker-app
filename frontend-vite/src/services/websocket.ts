import { io, Socket } from "socket.io-client";
import type { MoodEntry } from "../types/mood-types";

let socket: Socket | null = null;

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export const connectWebSocket = (
  onNewMood?: (mood: MoodEntry) => void,
  onDeleteMood?: (id: number) => void,
): void => {
  if (!socket) {
    socket = io(API_URL);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("moodAdded", (data: MoodEntry) => {
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
