import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context.tsx';
import { AuthProvider } from './auth/AuthContext';
createRoot(document.getElementById('root')).render(_jsx(BrowserRouter, { children: _jsx(ShopContextProvider, { children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }) }));
