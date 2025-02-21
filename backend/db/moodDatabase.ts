import pg from "pg";
import dotenv from "dotenv";
import { Mood, MoodType } from "./types/mood-types.js";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  await pool.end();
  process.exit(0);
});

export const getMoods = async (): Promise<Mood[]> => {
  try {
    const result = await pool.query("SELECT * FROM moods");

    const moods: Mood[] = result.rows.map((mood) => ({
      ...mood,
      createdAt: new Date(mood.createdAt).toISOString(),
    }));

    return moods;
  } catch (error) {
    console.log("error fetching moods:", error);
    return [];
  }
};

export const addMood = async (type: string): Promise<Mood | null> => {
  try {
    const result = await pool.query(
      `INSERT INTO moods ("createdAt", type) VALUES ($1, $2) RETURNING *`,
      [new Date().toISOString(), type]
    );
    return result.rows[0] as Mood;
  } catch (error) {
    console.log("error adding mood:", error);
    return null;
  }
};

export const deleteMood = async (id: number): Promise<Mood | null> => {
  try {
    const selectQuery = "SELECT * FROM moods WHERE id = $1";
    const selectResult = await pool.query(selectQuery, [id]);

    if (selectResult.rows.length === 0) {
      return null;
    }

    const deleteQuery = "DELETE FROM moods WHERE id = $1";
    await pool.query(deleteQuery, [id]);
    return selectResult.rows[0] as Mood;
  } catch (error) {
    console.log("error deleting mood:", error);
    return null;
  }
};
