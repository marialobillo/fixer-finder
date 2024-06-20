import './App.css'
import { Routes, Route } from 'react-router-dom'
import CreateTask from './pages/CreateTask'
import GetAllTasks from './pages/GetAllTasks'

function App() {
  return (
    <>
     <Routes>
     <Route path="/" element={<GetAllTasks />} />
      <Route path="/tasks" element={<CreateTask />} />
     </Routes>
    </>
  )
}

export default App
