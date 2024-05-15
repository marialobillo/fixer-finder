import './App.css'
import { Routes, Route } from 'react-router-dom'
import CreateJob from './pages/CreateJob'



function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<CreateJob />} />
     </Routes>
    </>
  )
}

export default App
