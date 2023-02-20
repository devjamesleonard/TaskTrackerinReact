import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router-dom'
//className is the same as class
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import {useState,useEffect} from 'react'

/*
function App() {
const name = 'Germex'
const bobranusisgay = true;
  return (
    <div className="container">
      <h1> Hello from React</h1>
      <h2>{bobranusisgay ? 'Germex' : "Neil"} is a nigger</h2>
    </div>
    
  );
}
<Header title="cock"/>
*/
const App = () => {
const [showAddTask,setShowAddTask] = useState(false)
  const [tasks,setTasks] = useState([



  ])
  //mock backend api we used but can replace with any backend
  useEffect(()=>{
const getTasks=async()=>{
  const taskFromServer = await fetchTasks()
  setTasks(taskFromServer)
}
getTasks()

  },[])
  //fetch tasks
  const fetchTasks= async()=>{
    const res=await fetch('http://localhost:5000/tasks')
    const data = await res.json()
  return data
  }
  //add tasj
  const addTask = async (task)=>{
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks,data])
    /*
    const id = Math.floor(Math.random()*10000)+1
    const newTask = {id,...task}
    setTasks([...tasks,newTask])
 */
  }
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    //SIMPLE DELETE REQUEST

    setTasks(tasks.filter((task)=>task.id!==id))
    //filter tool for  creating a new map with everyone except this unique one
  }
  const toggleReminder= async (id)=>{
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,reminder:!taskToToggle.reminder}
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })
    //getting updated data back
    const data = await res.json()
    //can update the other properties the same way or could use ...task for all properties you don't plan on editing
 setTasks(tasks.map((task)=>task.id===id?{...task,reminder:data.reminder}:task))
//creates a new mape xcept for this one with a new reminder property
  }
  //update
  const fetchTask= async(id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
  return data
  }
 return(
  <Router>
  <div className='container'>

    <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

    


{showAddTask&&<AddTask onAdd={addTask} />}
    {tasks.length>0 ? <Tasks tasks={tasks} onToggle={toggleReminder}onDelete={deleteTask} /> : "No Tasks to show" }

    
    <Footer />
    
  </div>
  </Router>
  /*
  <Router>
  <div className='container'>

    <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

    
    <Route path='/' exact render={(props) => (
<>
{showAddTask&&<AddTask onAdd={addTask} />}
    {tasks.length>0 ? <Tasks tasks={tasks} onToggle={toggleReminder}onDelete={deleteTask} /> : "No Tasks to show" }

</>


    )}/>
    <Route path='/about' component={About}/>
    <Footer />
  </div>
  </Router>
 */
  )

}

export default App;
