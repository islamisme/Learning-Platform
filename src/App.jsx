import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './app.css'
import Login from './components/Login'
import Register from './components/Register'
import NotesApp from './components/Notes/App'
import { EnrolledCoursesProvider } from './context/EnrolledCoursesContext'
import { UserProvider } from './context/UserContext'
import { NotesProvider } from './context/NotesContext'
import CarrerGrid from './components/CarrerGrid'
import AI from './components/Notes/AI'
import CareerRoleDetails from './components/CareerRoleDetails'
import EnrolledCourses from './components/EnrolledCourses'
import CourseStore from './components/CourseStore'

import { NewNote } from './components/Notes/NewNote'
import AuthGate from './components/AuthGate'
import CoursePage from './components/CoursePage'
import CourseProgress from './components/CourseProgress'
import CoursesLec from './components/CoursesLec'
function App() {
  return (
    <UserProvider>
      <NotesProvider>
        <EnrolledCoursesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Home" element={<Sidebar />}>
                <Route index element={<Dashboard />} />
                <Route path="Enrolled" element={<EnrolledCourses />} />
                <Route path="Store" element={<CourseStore />} />
                <Route path="Careers" element={<CarrerGrid />} />
                <Route path="careers/:roleId" element={<CareerRoleDetails />} />
                <Route path="/Home/Progress/:courseId/*" element={<CourseProgress />}/>
                <Route path="Lecture/:roleId/:courseId" element={<CoursesLec />} />
                <Route path="careers/:roleId/:courseIndex" element={<CoursePage />} />
                <Route path="Notes/*" element={<NotesApp />} />
                <Route path="Notes/AI" element={<AI />} />
              </Route>
              <Route path="/Register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </EnrolledCoursesProvider>
      </NotesProvider>
    </UserProvider>
  )
}

export default App