import express from "express";
import Task from '../models/task.model.js';
import axios from "axios";

const router = express.Router();

// Fetch all tasks 
router.get('/', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks)
    } catch(error){
        res.status(500).json({message: error.message})
    }

});

// Post a new task
router.post("/", async (req, res) =>  {

    const {text, dueDate} = req.body;

    try{
        const response = await axios.post("http://localhost:8000/predict", {
            text,
            dueDate: dueDate,
            completed: false
        })
        
        const priority = response.data.priority

        const task = new Task({text, dueDate, completed: false, priority})
        const savedTask = await task.save();
        res.status(201).json(savedTask)

    } catch (error){
        console.error(error)
        res.status(500).json({ message: "Error adding task" });

    }
});

// Edit a task
router.patch("/:id", async (req, res) => {
    try{
        const taskVar = await Task.findById(req.params.id);
        if (!taskVar) return res.status(404).json({message: "Task does not exist"});

        if (req.body.text !== undefined){
            taskVar.text = req.body.text;
        }

        if(req.body.completed !== undefined){
            taskVar.completed = req.body.completed
        }

        const updatedTask = await taskVar.save();
        res.json(updatedTask);

    } catch(error){
        res.status(400).json({message: error.message});
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.id)
        res.json({message: "Task deleted"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

export default router;