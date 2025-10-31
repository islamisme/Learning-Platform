import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import "./app.css"
import Courses from './components/Courses'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route path="/"  index element={<Dashboard />} />
        </Route>
        <Route path="/Courses" element={<Courses/>}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
