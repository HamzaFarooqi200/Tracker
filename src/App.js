import { useState, useEffect } from 'react'
import About from './components/About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}


export default App
//************************************************************************
// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Header from "./Components/Header";
// import Tasks from "./Components/Tasks";
// import Footer from "./Components/Footer";
// import AddTask from "./Components/AddTask";
// import About from "./Components/About";
// function App() {
//   const [showAddTask, setShowAddTask] = useState(false); //state for show and hide add task form
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const getTasks = async () => {
//       const tasksFromServer = await fetchTask(); //fetch task from server
//       setTasks(tasksFromServer); //set tasks
//     };
//     getTasks();
//   }, []); //empty array to run useEffect only once
//   //Fetch Tasks
//   const fetchTask = async () => {
//     const res = await fetch("http://localhost:5000/tasks"); //fetch data from server
//     const data = await res.json(); //convert data to json
//     return data;
//   };
//   //Fetch Task
//   const fetchTaskById = async (id) => {
//     const res = await fetch(`http://localhost:5000/tasks/${id}`); //fetch data from server
//     const data = await res.json(); //convert data to json
//     return data;
//   };
//   //Add Task
//   const addTask = async (task) => {
//     const res = await fetch("http://localhost:5000/tasks", {
//       method: "POST",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify(task),
//     }); //post task to server
//     const data = await res.json(); //convert data to json
//     setTasks([...tasks, data]); //add new task to tasks

//     // const id = Math.floor(Math.random() * 10000) + 1; //generate random id
//     // const newTask = { id, ...task }; //create new task with id and all the task
//     // setTasks([...tasks, newTask]); //add new task to tasks
//   };
//   //Delete
//   const deleteTask = async (id) => {
//     await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" }); //delete task from server
//     setTasks(tasks.filter((task) => task.id !== id));
//   };
//   //togle reminderr
//   const toggleReminder = async (id) => {
//     const taskToToggle = await fetchTaskById(id); //fetch task by id
//     const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }; //create new task with reminder changed
//     const res = await fetch(`http://localhost:5000/tasks/${id}`, {
//       method: "PUT",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify(updTask),
//     }); //update task on server
//     const data = await res.json(); //convert data to json
//     setTasks(
//       tasks.map(
//         (task) => (task.id === id ? { ...task, reminder: data.reminder } : task) //if task.id === id then return all the task and change reminder to !task.reminder else return task
//       )
//     );
//   };
//   return (
//     <Router>
//     <div className="container">
//       <Header
//         onAdd={() => setShowAddTask(!showAddTask)}
//         showAdd={showAddTask}
//       />
//       <Route path="/" exact render={(props) => (
//         <>
//           {showAddTask && <AddTask onAdd={addTask} />}
//           {tasks.length > 0 ? (
//             <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
//           ) : (
//             "No Tasks To Show"
//           )}
//         </>
//       )} />
//       <Route path="/about" component={About} />
//       <Footer />
//     </div>
//     </Router>
//   );
// }

// export default App;

