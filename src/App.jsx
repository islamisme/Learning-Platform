import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './app.css'
import Courses from './components/Courses'
import Login from './components/Login'
import Register from './components/Register'
import NotesApp from './components/Notes/App'
import { EnrolledCoursesProvider } from './context/EnrolledCoursesContext'
import CarrerGrid from './components/CarrerGrid'
import AI from './components/Notes/AI'
import CareerRoleDetails from './components/CareerRoleDetails'

function App() {
  return (
    <EnrolledCoursesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="Courses" element={<Courses />} />
            {/* Fixed: Separate route for career roles grid */}
            <Route path="careers" element={<CarrerGrid />} />
            {/* Fixed: Career role details route */}
            <Route path="careers/:roleId" element={<CareerRoleDetails />} />
            <Route path="Notes/*" element={<NotesApp />} />
            <Route path="Notes/AI" element={<AI />} />
          </Route>
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </EnrolledCoursesProvider>
  )
}

export default App