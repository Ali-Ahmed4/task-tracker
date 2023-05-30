import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import About from "./components/About";



function App() {
  const [showAddTask, setAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    
    const getTasks = async () => {
      const res = await fetchTasks()
      
      setTasks(res.data)
    }
    
    getTasks()
    
  },[])

  /* Fetch Tasks */

  const fetchTasks = async () => {

    const response = await axios.get('http://localhost:5000/tasks')
    
    return response
  }

  /* Fetch Task (single) */

  const fetchTask = async (id) => {

    const response = await axios.get(`http://localhost:5000/tasks/${id}`)
    
    return response
  } 

  /* Add fubctionality */

  const addTask = async (task) => {

    const response = await axios.post('http://localhost:5000/tasks',task)
    console.log(response)
    setTasks([...tasks, response.data])

    /* const id = tasks.length + 1
    const newTask = {id, ...task}
    console.log(newTask)
    setTasks([...tasks,newTask]) */
  }

  /* Delete functionality */

  const deleteTask = async (id) => {

    await axios.delete(`http://localhost:5000/tasks/${id}`)

    setTasks(tasks.filter((task) => { return task.id !== id}))
  }
  
  /* Toggle Reminder */

  const toggleReminder = async (id) => {

    const response = await fetchTask(id)

    const updateTask = {...response.data, reminder: !response.data.reminder }
    await axios.put(`http://localhost:5000/tasks/${id}`,updateTask)

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: updateTask.reminder} : task))
  }

  return (
    <Router>
      <div className="container">
        <Header title = "Task Tracker" onAdd= {() => setAddTask(!showAddTask)} onShow= {showAddTask} />
       
        <Routes>
          <Route path='/' exact element={
            <>
            {showAddTask ? <AddTask onAdd={addTask}/>: ''}
            {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle={toggleReminder} /> : <h4>No Tasks to show</h4>}
            </>
          } />

          
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
