import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import "./app.css"
import Courses from './components/Courses'
import Login from './components/Login'
import Register from './components/Register'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Home" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="/Home/Courses" element={<Courses/>}/> 
        </Route>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
