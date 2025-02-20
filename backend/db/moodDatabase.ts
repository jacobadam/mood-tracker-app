import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  await client.end();
  process.exit(0);
});

export const getMoods = async (): Promise<any[]> => {
  try {
    const result = await client.query("SELECT * FROM moods");

    const moods = result.rows.map((mood) => ({
      ...mood,
      createdAt: new Date(mood.createdAt).toISOString(),
    }));

    return moods;
  } catch (error) {
    console.log("error fetching moods:", error);
    return [];
  }
};

export const addMood = async (type: string): Promise<any | null> => {
  try {
    const result = await client.query(
      `INSERT INTO moods ("createdAt", type) VALUES ($1, $2) RETURNING *`,
      [new Date().toISOString(), type]
    );
    return result.rows[0];
  } catch (error) {
    console.log("error adding mood:", error);
    return null;
  }
};

export const deleteMood = async (id: number): Promise<any | null> => {
  try {
    const selectQuery = "SELECT * FROM moods WHERE id = $1";
    const selectResult = await client.query(selectQuery, [id]);

    if (selectResult.rows.length === 0) {
      return null;
    }

    const deleteQuery = "DELETE FROM moods WHERE id = $1";
    await client.query(deleteQuery, [id]);
    return selectResult.rows[0];
  } catch (error) {
    console.log("error deleting mood:", error);
    return null;
  }
};
