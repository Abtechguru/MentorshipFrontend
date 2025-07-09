import React, { useState } from 'react';
import axios from 'axios'
import { useShopContext } from '../context'
import { useNavigate } from 'react-router-dom'

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name?: string;
    email: string;
    role: string; 
  };
}

function Login() {
  const navigate = useNavigate();
  const context = useShopContext();
const backendUrl = context?.backendUrl || 'https://mentorship-1-jpz3.onrender.com'; // Default URL if not provided
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post<LoginResponse>(
        `${backendUrl}/api/auth/login`,
        { email, password } 
      );
if (response.status === 200) {
  navigate('/'); // Redirect to home page on successful login
} else {
  setError('Login failed. Please check your credentials.');
      //if (response.data.user.role === "admin") {
        //navigate('/admin');
     // }
    } } catch (error) {
  const err = error as Error;
  console.error(err);
  setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          Mentorship Login Page
        </h2>
        <p className="text-sm text-center text-gray-600">Log in to your account</p>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow transition disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
