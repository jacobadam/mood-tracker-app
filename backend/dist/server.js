"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const moodDatabase_js_1 = require("./db/moodDatabase.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const corsOptions = {
    origin: process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
};
const io = new socket_io_1.Server(server, {
    cors: corsOptions,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const moodSchema = zod_1.z.object({
    type: zod_1.z
        .string()
        .min(1, "Mood type cannot be empty")
        .max(20, "Mood type is too long"),
});
const validateMood = (req, res, next) => {
    const validation = moodSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
    }
    next();
};
app.get("/", (_req, res) => {
    res.send("Hello from / server");
});
app.get("/moods", async (_req, res) => {
    try {
        const moods = await (0, moodDatabase_js_1.getMoods)();
        res.json(moods);
    }
    catch (error) {
        res.status(500).json({ error: "failed to fetch moods" });
    }
});
app.post("/mood", validateMood, async (req, res) => {
    try {
        const { type } = req.body;
        const newMood = await (0, moodDatabase_js_1.addMood)(type);
        if (!newMood) {
            console.error("Failed to retrieve newMood after insertion.");
            return res.status(500).json({ error: "Failed to add mood" });
        }
        io.emit("moodAdded", newMood);
        res.status(201).json({ message: "Mood added successfully", mood: newMood });
    }
    catch (error) {
        console.error("Error adding mood:", error);
        res.status(500).json({ error: "Failed to add mood" });
    }
});
app.delete("/mood/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid mood ID" });
        }
        const deletedMood = await (0, moodDatabase_js_1.deleteMood)(id);
        if (!deletedMood) {
            return res.status(404).json({ error: "Mood not found" });
        }
        res.status(200).json({ message: "Mood deleted successfully" });
        io.emit("moodDeleted", { id });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete mood" });
    }
});
app.use((err, _req, res, _next) => {
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
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
