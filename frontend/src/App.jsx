import { useEffect, useState } from "react"
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5"
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6"
import { IoClipboardOutline } from "react-icons/io5"

function App() {
  
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState(""); 
  const [dueDate, setDueDate] = useState("");

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



  const getAllTasks = async () => {

    try{
      const response = await axios.get("/api/tasks");
      console.log(response.data)
      setTasks(response.data)
    } catch(error){
      console.log("Error gathering all tasks: ", error);
    }
    
  }


  useEffect(() => {
    getAllTasks();
  }, [])

  const startEditingTask = (task) => {
    setEditingTask(task._id)
    setEditedText(task.text)
  }

  const saveEdit = async (id) => {

    try{
      const response = await axios.patch(`/api/tasks/${id}`, {text: editedText })
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)))
      setEditingTask(null)
    } catch(error) {
        console.log("Error processing edit. Please try again!", error)
    }


  }

  const deleteTask = async (id) => {
    try{
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id))
    } catch(error){
      console.log("Error deleting task:", error)
    } 
  }

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

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100
    flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
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

    
        <div className="mt-8">
          {tasks.length === 0 ? (
            <div>
              {/* Show nothing if task list is empty */}
            </div>
          ) : (
            <div flex gap-4>
              {tasks.map((task) => (
                <div key={task._id}>
                  
                  {editingTask === task._id ? (
                    <div className="flex items-center gap-x-3">
                      <input 
                        className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 
                        focus-ring-blue-300 text-gray-700 shadow-inner"
                        type="text" 
                        value={editedText} 
                        onChange={(e) => setEditedText(e.target.value)}
                      />

                    <div className="flex gap-x-2">

                    <button 
                      onClick={() => saveEdit(task._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg 
                      hover:bg-green-600 cursor-pointer">
                          <MdOutlineDone/>
                    </button>

                      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg 
                      hover:bg-gray-600 cursor-pointer" 
                        
                        onClick={() => setEditingTask(null)}>

                        <IoClose/>
                      </button>

                    </div>

                    </div>
                  ): (
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-x-4">
                         <button 
                          onClick={() => toggleTasks(task._id)}
                          className={`h-6 w-6 border rounded-full flex items-center justify-center ${task.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-400"}`}>

                            {task.completed && <MdOutlineDone/> }
                          </button>
                        
                        <span className="text-gray-800 font-medium">      
                          {task.text}
                        </span>
                      </div>

                      <div className="flex gap-x-2">
                        <button className="p-2 text-blue-500 hover:text-blue-700 rounded-lg
                          hover:bg-blue-50 duration-200"                       
                          onClick={() => startEditingTask(task)}                
                        >
                          <MdModeEditOutline/>
                        </button>
                      
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
              
              ))}
            </div>
          )
          }
        </div>

    

      </div> 
    </div>
  );
}

export default App
