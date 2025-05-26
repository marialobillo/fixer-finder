import './App.css'
import { Routes, Route } from 'react-router-dom'
import GetAllTasks from './pages/GetAllTasks'
import NewTask from './pages/NewTask'
import TaskFilter from './pages/TaskFilter'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/tasks' element={<GetAllTasks />} />
        <Route path='/newtask' element={<NewTask />} />
        <Route path='/taskfilter' element={<TaskFilter />} />
      </Routes>
    </>
  )
}

export default App
