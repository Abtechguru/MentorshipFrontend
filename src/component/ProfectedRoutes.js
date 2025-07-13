import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
const ProtectedRoute = ({ children, requireAuth = true, allowedRoles = [] }) => {
    const { user, isAuthenticated, token } = useAuth();
    const location = useLocation();
    // If authentication is not required, render children directly
    if (!requireAuth) {
        return _jsx(_Fragment, { children: children });
    }
    // If not authenticated, redirect to login
    if (!isAuthenticated || !token) {
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    // If user exists but no roles are specified, allow access
    if (allowedRoles.length === 0) {
        return _jsx(_Fragment, { children: children });
    }
    // Check if user has required role
    if (user && user.role && allowedRoles.includes(user.role)) {
        return _jsx(_Fragment, { children: children });
    }
    // If user doesn't have required role, redirect to unauthorized page
    return _jsx(Navigate, { to: "/unauthorized", replace: true });
};
export default ProtectedRoute;
