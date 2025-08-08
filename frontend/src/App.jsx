import { useState } from "react"
import axios from "axios";
import { MDOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5"
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6"
import { IoClipboardOutline } from "react-icons/io5";

function App() {
  
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = async (e) => {
    e.preventDefault();
    if(!newTask.trim()) return;
    try {
        const response = await axios.post("/api/tasks", {text: newTask})
        setTasks([...tasks, response.data])
        setNewTask("")
    } catch(error) {
        console.log("Error adding task:", error)
    }
  };


  return(

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100
    flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Available Tasks
          </h1>

        <form 
          onSubmit={addTask} 
          className="flex items-center gap-2 shadow-sm border 
          border-gray-200 p-2 rounded-lg"
        >

          <input 
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
              placeholder="Need to do something? Add it here!"
              required
          />

          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 
            rounded-md font-medium cursor-pointer"
            > 
            Add Task 
          </button>
        </form>

        <div>
          {tasks.length === 0 ? (
            <div></div>
          ) : (
            <div>
              {tasks.map((todo => (
                <div key={todo._id}>{todo.text}</div>
              )))}
            </div>
          )
          }
        </div>

         
      </div> 
    </div>
  );
}

export default App
