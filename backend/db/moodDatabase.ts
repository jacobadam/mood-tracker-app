import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("db/database.db");
const db = new Database(dbPath);

export const getMoods = (): any[] => {
  try {
    const sql = `
    SELECT * FROM moods
  `;
    return db.prepare(sql).all();
  } catch (error) {
    console.log("error fetching moods:", error);
    return [];
  }
};
