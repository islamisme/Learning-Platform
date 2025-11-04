import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import "./app.css"
import Courses from './components/Courses'
import Login from './components/Login'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Home" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="Courses" element={<Courses/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
