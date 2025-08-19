import { useEffect, useState } from "react"
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5"
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6"

/* Created by: Massad Raza */

function App() {


  /* State Variables for Task Application */
  const [newTask, setNewTask] = useState(""); 
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState(""); 
  const [dueDate, setDueDate] = useState("");


  /* Adds a task */
  const addTask = async (e) => {
    e.preventDefault();
    if(!newTask.trim()) return;
    try {
        const response = await axios.post("/api/tasks", {text: newTask, dueDate: dueDate})
        setTasks([...tasks, response.data])
        setNewTask("")
        setDueDate("")
    } catch(error) {
        console.log("Error adding task:", error)
    }
  };


  /* Retrives all tasks */
  const getAllTasks = async () => {

    try{
      const response = await axios.get("/api/tasks");
      console.log(response.data)
      setTasks(response.data)
    } catch(error){
      console.log("Error gathering all tasks: ", error);
    }
    
  }

  /* Displays all tasks to the user */
  useEffect(() => {getAllTasks();}, [])

  /* Allows the user to start editing a task */
  const startEditingTask = (task) => {
    setEditingTask(task._id)
    setEditedText(task.text)
  }


  /* Allows the user to save an edit to a task */
  const saveEdit = async (id) => {
    try{
      const response = await axios.patch(`/api/tasks/${id}`, {text: editedText })
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)))
      setEditingTask(null)
    } catch(error) {
        console.log("Error processing edit. Please try again!", error)
    }
  }

  /* Allows the user to delete a task */
  const deleteTask = async (id) => {
    try{
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id))
    } catch(error){
      console.log("Error deleting task:", error)
    } 
  }

  /* Allows the user to toggle between completed or not completed */
  const toggleTasks = async (id) => {

    try {
      const task = tasks.find((e) => e._id === id)
      const response = await axios.patch(`/api/tasks/${id}`, { completed: !task.completed})
      setTasks(tasks.map((e) => e._id === id ? response.data : e))
    }catch (error) {
      console.log("Error processing request: ", error)
    }
  }




  return(

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-900 flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl drop-shadow-2xl w-full max-w-4xl p-8">
          
          {/* Header */}
          <h1 className="bg-white rounded-2x1 font-bold text-gray-800 mb-8 text-center text-3xl">
            Task Telligence
          </h1>

        <form 
          onSubmit={addTask} 
          className="flex flex-wrap gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          
          
        <div className="flex gap-2 w-full flex-wrap">

          {/* Add task input space */}
          <input 
            className="flex-1 min-w-[150px] px-3 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add Task Here!"
            required
          />

        {/* Due Date input space */}
          <input
            className="flex-none min-w-[140px] px-3 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Due Date"
            onFocus={(e) => e.target.type = "date"}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            />
      
        </div>

        <div className="flex gap-4 justify-center flex-wra w-full">

        {/* Add Task Button */}

          <button 
            type="submit" 
            className="flex-none bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          > 
            Add Task 
          </button>

        </div>

        </form>

      <div className="mt-8">

        {tasks.length === 0 ? (
            <div>
              {/* Show nothing if task list is empty */}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {tasks.map((task) => {
                let priorityColor;
                switch (task.priority) {
                  case "high":
                    priorityColor = "ml-3 px-2 py-1 text-xs rounded-lg font-semibold bg-red-100 text-red-600";
                    break;
                  case "medium":
                    priorityColor = "ml-3 px-2 py-1 text-xs rounded-lg font-semibold bg-yellow-100 text-yellow-600";
                    break;
                  case "low":
                    priorityColor = "ml-3 px-2 py-1 text-xs rounded-lg font-semibold bg-green-100 text-green-600";
                    break;
                  default:
                    priorityColor = "text-gray-500";
              }
              
              return (

                <div key={task._id}>
                  
                  {editingTask === task._id ? (
                    <div className="flex items-center gap-x-7">
                      <input 
                        className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 
                        focus-ring-blue-300 text-gray-700 shadow-inner"
                        type="text" 
                        value={editedText} 
                        onChange={(e) => setEditedText(e.target.value)}
                      />

                  <div className="flex gap-x-2">

                    {/* Checkmark to indicate client is finish/save editing task */}
                    <button 
                      onClick={() => saveEdit(task._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg 
                      hover:bg-green-600 cursor-pointer">
                          <MdOutlineDone/>
                    </button>

                    {/* X mark to indicate client is no longer interested in editing task, changes NOT saved */}
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg 
                      hover:bg-gray-600 cursor-pointer" 
                        onClick={() => setEditingTask(null)}>
                        <IoClose/>
                    </button>

                  </div>

            </div>
                  ): (
                    <div className="flex items-center justify-between w-full">

                      <div className="flex items-center gap-x-4">

                      {/* Check button to mark task as complete */}
                        <button 
                          onClick={() => toggleTasks(task._id)}
                          className={`h-6 w-6 border rounded-full flex items-center justify-center ${task.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-400"}`}>
                            
                            {task.completed && <MdOutlineDone/> }
                        </button>
                        

                        {/* Display a task */}
                        <span className="text-gray-800 font-medium">      
                          {task.text}
                        </span>

                        {/* Display the due date of the task */}
                        {task.dueDate && (
                          <span className="text-gray-500 text-sm ml-2">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}

                        {/* Display the task priority */}
                         {task.priority && (
                            <span className={`text-sm ml-2 ${priorityColor}`}>
                              Priority: {task.priority.toUpperCase()}
                            </span> )}

                      </div>

                      {/* Edit Task Button */}
                      <div className="flex items-center gap-x-2">
                        <button className="p-2 text-blue-500 hover:text-blue-700 rounded-lg
                          hover:bg-blue-50 duration-200"                       
                          onClick={() => startEditingTask(task)}                
                        >
                          <MdModeEditOutline/>
                        </button>
                      
                      {/* Trash Button */}
                        <button 
                          onClick={() => deleteTask(task._id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg
                          hover:bg-red-50 duration-200"
                        >
                          <FaTrash/>
                      </button>

                      </div>
                      
                    </div>
                  )}
                    
                </div>
              );
              })}  
            </div>
          )}
        </div>

      </div> 
    </div>
  );
}

export default App
