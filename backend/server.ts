import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";
import { getMoods, addMood, deleteMood } from "./db/moodDatabase.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

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

app.get("/moods", (_req: Request, res: Response) => {
  try {
    const moods = getMoods();
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch moods" });
  }
});

app.post("/mood", validateMood, (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    addMood(type);
    res.status(201).json({ message: "Mood added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add mood" });
  }
});

app.delete("/mood/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid mood ID" });
    }

    deleteMood(id);
    res.status(200).json({ message: "Mood deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete mood" });
  }
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
