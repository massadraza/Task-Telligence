import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.route.js "
import { connectDB } from "./config/db.js";

// Load env file containing MONGODB_URI
dotenv.config();

// Create instance of express app
const app = express();


app.get("/", (req, res) => {
    res.send("Server is ready to use");
});


app.use(express.json());


app.use("/api/tasks", taskRoutes);

app.listen(4000, () => {
    connectDB();
    console.log("Server started at http://localhost:4000")
});

