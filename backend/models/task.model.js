
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        dueDate: {
            type: Date,
        },
        priority: {
            type: String,
            enum: ["High", "Medium", "Low"],
            default: "Low"
        }
    },
    {timestamps: true}
);

const Task = mongoose.model("Task", taskSchema);

export default Task;