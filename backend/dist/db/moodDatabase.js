"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMood = exports.addMood = exports.getMoods = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Pool } = pg_1.default;
const isProduction = process.env.NODE_ENV === "production";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
    ...(process.env.DATABASE_URL
        ? {}
        : {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT || "5432"),
        }),
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
const getMoods = async () => {
    try {
        const result = await pool.query("SELECT * FROM moods");
        const moods = result.rows.map((mood) => ({
            ...mood,
            createdAt: new Date(mood.createdAt).toISOString(),
        }));
        return moods;
    }
    catch (error) {
        console.log("error fetching moods:", error);
        return [];
    }
};
exports.getMoods = getMoods;
const addMood = async (type) => {
    try {
        const result = await pool.query(`INSERT INTO moods ("createdAt", type) VALUES ($1, $2) RETURNING *`, [new Date().toISOString(), type]);
        return result.rows[0];
    }
    catch (error) {
        console.log("error adding mood:", error);
        return null;
    }
};
exports.addMood = addMood;
const deleteMood = async (id) => {
    try {
        const selectQuery = "SELECT * FROM moods WHERE id = $1";
        const selectResult = await pool.query(selectQuery, [id]);
        if (selectResult.rows.length === 0) {
            return null;
        }
        const deleteQuery = "DELETE FROM moods WHERE id = $1";
        await pool.query(deleteQuery, [id]);
        return selectResult.rows[0];
    }
    catch (error) {
        console.log("error deleting mood:", error);
        return null;
    }
};
exports.deleteMood = deleteMood;
