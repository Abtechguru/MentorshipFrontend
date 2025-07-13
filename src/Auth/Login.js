import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { useShopContext } from '../context';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const context = useShopContext();
    const backendUrl = context?.backendUrl || 'https://mentorship-1-jpz3.onrender.com'; // Default URL if not provided
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
            if (response.status === 200) {
                navigate('/'); // Redirect to home page on successful login
            }
            else {
                setError('Login failed. Please check your credentials.');
                //if (response.data.user.role === "admin") {
                //navigate('/admin');
                // }
            }
        }
        catch (error) {
            const err = error;
            console.error(err);
            setError('Login failed. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4", children: _jsxs("div", { className: "bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6", children: [_jsx("h2", { className: "text-3xl font-bold text-center text-indigo-700", children: "Mentorship Login Page" }), _jsx("p", { className: "text-sm text-center text-gray-600", children: "Log in to your account" }), error && (_jsx("p", { className: "text-sm text-red-600 text-center", children: error })), _jsxs("form", { onSubmit: submit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }), _jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), type: "email", id: "email", className: "mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none", placeholder: "you@example.com", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("input", { value: password, onChange: (e) => setPassword(e.target.value), type: "password", id: "password", className: "mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow transition disabled:opacity-50", children: isLoading ? 'Logging in...' : 'Log In' })] })] }) }));
}
export default Login;
