import './App.css'
import { Route, Routes } from 'react-router-dom'
import login from './Auth/login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Pag</div>} />
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/register" element={<div>Register Page</div>} />
      <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      <Route path="/profile" element={<div>Profile Page</div>} />
      <Route path="/settings" element={<div>Settings Page</div>} />
    </Routes>
  )

}

export default App
