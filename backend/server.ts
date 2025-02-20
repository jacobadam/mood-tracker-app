import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";
import http from "http";
import { Server } from "socket.io";
import { getMoods, addMood, deleteMood } from "./db/moodDatabase.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

const moodSchema = z.object({
  type: z
    .string()
    .min(1, "Mood type cannot be empty")
    .max(20, "Mood type is too long"),
});

const validateMood = (req: Request, res: Response, next: NextFunction) => {
  const validation = moodSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() });
  }
  next();
};

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from / server");
});

app.get("/moods", async (_req: Request, res: Response) => {
  try {
    const moods = await getMoods();
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch moods" });
  }
});

app.post("/mood", validateMood, async (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    const newMood = await addMood(type);

    if (!newMood) {
      console.error("Failed to retrieve newMood after insertion.");
      return res.status(500).json({ error: "Failed to add mood" });
    }

    io.emit("moodAdded", newMood);

    res.status(201).json({ message: "Mood added successfully", mood: newMood });
  } catch (error) {
    console.error("Error adding mood:", error);
    res.status(500).json({ error: "Failed to add mood" });
  }
});

app.delete("/mood/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid mood ID" });
    }

    const deletedMood = await deleteMood(id);

    if (!deletedMood) {
      return res.status(404).json({ error: "Mood not found" });
    }

    res.status(200).json({ message: "Mood deleted successfully" });
    io.emit("moodDeleted", { id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete mood" });
  }
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (msg) => {
    console.log(`Message from client: ${msg}`);
    socket.emit("response", `Server received: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`server is listening on port ${process.env.PORT || 8080}`);
});
