import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.route.js "
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

/* No longer needed

app.get("/", (req, res) => {
    res.send("Server is ready to use");
});

*/ 
app.use(express.json())

app.use("/api/task/;id", taskRoutes)

app.listen(4000, () => {
    connectDB();
    console.log("Server started at http://localhost:4000")
});
