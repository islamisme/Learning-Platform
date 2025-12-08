import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import "./app.css"
import Courses from './components/Courses'
import Login from './components/Login'
import Register from './components/Register'
import NotesApp from './components/Notes/App'
import { NewNote } from './components/Notes/NewNote'
import AuthGate from './components/AuthGate'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Home" element={<AuthGate><Sidebar /></AuthGate>}>
          <Route index element={<Dashboard />} />
          <Route path="/Home/Courses" element={<Courses/>}/> 
          <Route path="/Home/Notes/*" element={<NotesApp/>}/>
        </Route>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
