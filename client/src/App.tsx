import './App.css'
import { Routes, Route } from 'react-router-dom'
import GetAllTasks from './pages/GetAllTasks'
import GetTasksFiltered from './pages/GetTasksFiltered'
import NewTask from './pages/NewTask'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<GetAllTasks />} />
        <Route path='/newtask' element={<NewTask />} />
        <Route path='/tasks/filter' element={<GetTasksFiltered />} />
      </Routes>
    </>
  )
}

export default App
