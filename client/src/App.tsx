import './App.css'
import { Routes, Route } from 'react-router-dom'
import CreateTask from './pages/CreateTask'


function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<CreateTask />} />
     </Routes>
    </>
  )
}

export default App
