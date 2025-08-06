import { useState } from "react"
import axios from "axios";

function App() {
  
  const [newTask, setNewTask] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    if(!newTodo.trim()) return;
    try{
        const response = await axios.post("/api/task", {text: newTask})
    }catch(error){

    }
  }




  return(

    <div className="min-h-screen bg-gradient-to-br from gray-50 to-gray-100
    flex items-center justify-center p-4">
      <div className="bg-white rounded-2x1 shadow-x1 w-full max-w-lg p-8">
          <h1 className="text-4x1 font-bold text-gray-800 mb-8">
            Available Tasks
          </h1>
        <form className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg">
          <input 
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text" 
            value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Need to do something? Add it here!"
              required
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 
          rounded-md font-medium cursor-pointer">Add Task</button>
        </form>
         
      </div> 
    </div>
  );
}

export default App
