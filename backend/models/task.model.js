
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
            type: String,
        },
        priority: {
            type: String,
            default: "None",
        },
    },
    {timestamps: true}
);

const Task = mongoose.model("Task", taskSchema);

export default Task;