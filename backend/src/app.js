import express from "express";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());


app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "API is running",
    });
});

app.use("/api/users", userRoutes);

export default app;
 