import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useShopContext } from '../context';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const shopContext = useShopContext();
    useEffect(() => {
        const fetchUserData = async (token) => {
            try {
                const backendUrl = shopContext?.backendUrl || '';
                const response = await axios.get(`${backendUrl}/api/auth/getUserData`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            catch (error) {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
            }
        };
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (storedToken) {
                setToken(storedToken);
                await fetchUserData(storedToken);
            }
            else if (storedUser) {
                try {
                    const userData = JSON.parse(storedUser);
                    setUser(userData);
                    setIsAuthenticated(true);
                }
                catch (error) {
                    localStorage.removeItem('user');
                }
            }
        };
        initializeAuth();
    }, [shopContext]);
    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };
    const logout = async () => {
        try {
            const backendUrl = shopContext?.backendUrl || '';
            await axios.post(`${backendUrl}/api/auth/logout`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
        catch (error) {
            console.error('Error during logout:', error);
        }
        finally {
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };
    const value = {
        user,
        token,
        isAuthenticated,
        login,
        logout
    };
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
