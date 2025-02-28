import { io, Socket } from "socket.io-client";
import { Mood } from "../types/mood-types";

let socket: Socket | null = null;

export const connectWebSocket = (
  onNewMood?: (mood: Mood) => void,
  onDeleteMood?: (id: number) => void
): void => {
  const API_URL: string =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"
      : "http://localhost:8080";
  if (!socket) {
    socket = io(API_URL);

    socket.on("connect", () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("Connected to WebSocket server");
      }
    });

    socket.on("moodAdded", (data: Mood) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("New mood received:", data);
      }
      onNewMood?.(data);
    });

    socket.on("moodDeleted", (data: { id: number }) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("Mood deleted:", data.id);
      }
      onDeleteMood?.(data.id);
    });

    socket.on("disconnect", () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("Disconnected from WebSocket server");
      }
    });

    socket.on("connect_error", (err: Error) => {
      if (process.env.NODE_ENV !== "production") {
        console.error("WebSocket connection error:", err.message);
      }
    });
  }
};

export const disconnectWebSocket = (): void => {
  if (socket) {
    socket.disconnect();
    if (process.env.NODE_ENV !== "production") {
      console.log("Disconnected from WebSocket server");
    }
    socket = null;
  }
};
