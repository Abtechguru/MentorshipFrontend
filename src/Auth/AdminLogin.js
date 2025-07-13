import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from 'axios';
import { useState } from 'react';
import { useShopContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
function AdminLogin() {
    const navigate = useNavigate();
    const context = useShopContext();
    const backendUrl = context?.backendUrl || "";
    const { login } = useAuth();
    // Get the intended destination from location state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const response = await axios.post(`${backendUrl}/api/auth/login`, {
                email, password
            });
            if (response.status === 200 && response.data.user.role === "admin") {
                // Use the auth context to handle login
                login(response.data.token, response.data.user);
                // Navigate to the intended destination or home
                navigate("/adminDashboard");
            }
            // if(response.data.user.role==="admin"){
            //     navigate("/admin")
            // }
        }
        catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: 'mt-10 justify-self-center mx-auto', children: [_jsx("h1", { className: 'justify-self-center justify-center font-bold text-2xl', children: "Admin Login page" }), _jsxs("form", { className: 'max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg', onSubmit: submit, children: [_jsx("h1", { className: 'text-xl font-bold text-center', children: "Login to your account" }), error && (_jsx("div", { className: 'mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded', children: error })), _jsxs("div", { className: 'mb-4', children: [_jsx("label", { htmlFor: 'email', className: 'block text-gray-600 mb-2', children: "Email address" }), _jsx("input", { id: "email", value: email, onChange: (e) => setEmail(e.target.value), type: 'email', placeholder: 'Enter your email address', required: true, className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500', disabled: isLoading })] }), _jsxs("div", { className: 'mb-6', children: [_jsx("label", { htmlFor: 'password', className: 'block text-gray-600 mb-2', children: "Password" }), _jsx("input", { id: "password", value: password, onChange: (e) => setPassword(e.target.value), type: 'password', placeholder: 'Enter your password', required: true, className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500', disabled: isLoading })] }), _jsx("button", { type: 'submit', className: 'w-full mt-5 text-lg bg-blue-500 text-white py-3 px-6 rounded-lg focus:outline-none hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors', disabled: isLoading, children: isLoading ? 'Logging in...' : 'Login' })] })] }));
}
export default AdminLogin;
