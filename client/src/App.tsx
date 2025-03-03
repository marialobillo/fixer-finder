import './App.css'
import { Routes, Route } from 'react-router-dom'
import GetAllTasks from './pages/GetAllTasks'
import NewTask from './pages/NewTask'
import TaskFilter from './pages/TaskFilter'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={} />
        <Route path='/tasks' element={<GetAllTasks />} />
        <Route path='/newtask' element={<NewTask />} />
        <Route path='/taskfilter' element={<TaskFilter />} />
      </Routes>
    </>
  )
}

export default App
