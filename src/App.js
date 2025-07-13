import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './auth/Login';
import Profile from './pages/profile';
import MentorsPage from './pages/MentorPage';
import Unauthorized from './pages/Unauthorized';
import BecomeMentor from './pages/BecomeMentor';
import { useAuth } from './auth/AuthContext';
import AdminLogin from './auth/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
// LogoutRedirect component
function LogoutRedirect() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate('/login');
        };
        performLogout();
    }, [logout, navigate]);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Logging out..." })] }) }));
}
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: '/login', element: _jsx(Login, {}) }), _jsx(Route, { path: '/unauthorized', element: _jsx(Unauthorized, {}) }), _jsx(Route, { path: '/logout', element: _jsx(LogoutRedirect, {}) }), _jsx(Route, { path: '/adminLogin', element: _jsx(AdminLogin, {}) }), _jsx(Route, { path: '/adminDashboard', element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: '/profile', element: _jsx(Profile, {}) }), _jsx(Route, { path: '/mentors', element: _jsx(MentorsPage, {}) }), _jsx(Route, { path: '/become-mentor', element: _jsx(BecomeMentor, {}) })] }));
}
export default App;
