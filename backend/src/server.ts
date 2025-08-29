// Server start file
import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
    res.json({ message: "API is running 🚀" });
});

// User routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
