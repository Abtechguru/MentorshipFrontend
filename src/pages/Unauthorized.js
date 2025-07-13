import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
function Unauthorized() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4", children: _jsxs("div", { className: "max-w-md w-full text-center", children: [_jsx("div", { className: "w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx("svg", { className: "w-12 h-12 text-red-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }) }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Access Denied" }), _jsxs("p", { className: "text-gray-600 mb-6", children: ["Sorry, you don't have permission to access this page.", user && (_jsxs("span", { className: "block mt-2", children: ["You are logged in as: ", _jsx("span", { className: "font-semibold text-gray-800", children: user.email })] }))] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Link, { to: "/", className: "block w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-semibold", children: "Go to Home" }), _jsx(Link, { to: "/profile", className: "block w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold", children: "View Profile" }), _jsx("button", { onClick: handleLogout, className: "block w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors font-semibold", children: "Logout" })] }), _jsx("p", { className: "text-sm text-gray-500 mt-6", children: "If this is an error, please contact support." })] }) }));
}
export default Unauthorized;
