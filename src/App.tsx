import { Route,Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './auth/Login'
import Profile from './pages/profile'
import MentorsPage from './pages/MentorPage'
import Unauthorized from './pages/Unauthorized'
import BecomeMentor from './pages/BecomeMentor'
import { useAuth } from './auth/AuthContext'
import AdminLogin from './auth/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
// LogoutRedirect component
function LogoutRedirect() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const performLogout = async () => {
      await logout()
      navigate('/login')
    }
    performLogout()
  }, [logout, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  )
}
function App ()  {

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/unauthorized' element={<Unauthorized/>} />
      <Route path='/logout' element={<LogoutRedirect/>} />
      <Route path='/adminLogin' element={<AdminLogin/>} />
      <Route path='/adminDashboard' element={<AdminDashboard/>} />
      {/* Protected Routes */}
      <Route path='/profile' element={
          <Profile/>
      } />
      
      <Route path='/mentors' element={
          <MentorsPage/>
      } />
      
      <Route path='/become-mentor' element={
          <BecomeMentor/>
      } />
      </Routes>
  )
}

export default App;