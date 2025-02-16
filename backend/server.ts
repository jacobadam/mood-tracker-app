import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getMoods, addMood, deleteMood } from "./db/moodDatabase.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
  res.send("hello from / server");
});

app.get("/moods", (req, res) => {
  try {
    const moods = getMoods();
    res.send(moods);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch moods" });
  }
});

app.post("/mood", (req, res) => {
  try {
    const { type } = req.body;
    addMood(type);
    res.status(201).json({ message: "Mood added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add mood" });
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
