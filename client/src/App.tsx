import './App.css'
import { Routes, Route } from 'react-router-dom'
import CreateTask from './pages/CreateTask'
import GetAllTasks from './pages/GetAllTasks'
import TaskListForProfessionals from './pages/TaskListForProfessionals'


function App() {
  return (
    <>
     <Routes>
     <Route path="/" element={<GetAllTasks />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/tasks" element={<CreateTask />} />
      <Route path="/for-professionals" element={<TaskListForProfessionals />} />
     </Routes>
    </>
  )
}

export default App
