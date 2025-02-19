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

export const addMood = (type: string): any | null => {
  try {
    const sql = `
    INSERT INTO moods (createdAt, type)
    VALUES (?, ?)
  `;
    const stmt = db.prepare(sql);
    const info = stmt.run(new Date().toISOString(), type);

    if (info.changes > 0) {
      return db
        .prepare(`SELECT * FROM moods WHERE id = ?`)
        .get(info.lastInsertRowid);
    }
  } catch (error) {
    console.log("error adding mood:", error);
  }
};

export const deleteMood = (id: number): any | null => {
  try {
    const sqlSelect = `SELECT * FROM moods WHERE id = ?`;
    const entry = db.prepare(sqlSelect).get(id);

    if (!entry) return null;

    const sqlDelete = `
    DELETE FROM moods 
    WHERE id = ?
  `;

    const stmt = db.prepare(sqlDelete);
    const info = stmt.run(id);

    return info.changes > 0 ? entry : null;
  } catch (error) {
    console.log("error deleting mood:", error);
  }
};
