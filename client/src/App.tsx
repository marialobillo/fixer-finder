import './App.css'
import { Routes, Route } from 'react-router-dom'
import CreateTask from './pages/CreateTask'
import GetAllTasks from './pages/GetAllTasks'
import GetTasksFiltered from './pages/GetTasksFiltered'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<GetAllTasks />} />
        <Route path='/create-task' element={<CreateTask />} />
        <Route path='/tasks/filter' element={<GetTasksFiltered />} />
      </Routes>
    </>
  )
}

export default App
