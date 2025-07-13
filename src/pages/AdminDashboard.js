import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useShopContext } from '../context';
const sections = [
    { key: 'createMentor', label: 'Create Mentor', icon: '👨‍🏫' },
    { key: 'assignRoles', label: 'Assign Roles', icon: '🛠️' },
    { key: 'bookSessions', label: 'Book Sessions', icon: '📅' },
    { key: 'viewMentors', label: 'View Mentors', icon: '👥' },
];
const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { backendUrl } = useShopContext() || {};
    const [activeSection, setActiveSection] = useState('createMentor');
    // State for Create Mentor form
    const [mentorForm, setMentorForm] = useState({
        name: '',
        email: '',
        availability: '',
        bio: '',
        topic: '',
        password: '',
        experience: '',
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [mentors, setMentors] = useState([]);
    const [mentorsLoading, setMentorsLoading] = useState(false);
    const [mentorsError, setMentorsError] = useState('');
    useEffect(() => {
        if (activeSection === 'viewMentors') {
            fetchMentors();
        }
    }, [activeSection, backendUrl]);
    const fetchMentors = () => {
        setMentorsLoading(true);
        setMentorsError('');
        axios.get(`${backendUrl}/api/get-mentors`)
            .then(res => {
            setMentors(res.data.mentors || res.data || []);
        })
            .catch(err => {
            setMentorsError(err.response?.data?.message || 'Failed to fetch mentors.');
        })
            .finally(() => setMentorsLoading(false));
    };
    const handleMentorInput = (e) => {
        setMentorForm({ ...mentorForm, [e.target.name]: e.target.value });
    };
    const handleCreateMentor = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');
        if (!mentorForm.name || !mentorForm.email || !mentorForm.availability || !mentorForm.bio || !mentorForm.topic || !mentorForm.password || !mentorForm.experience) {
            setFormError('All fields are required.');
            return;
        }
        setFormLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/api/addMentor`, mentorForm);
            if (response.status === 201 || response.status === 200) {
                setFormSuccess('Mentor created successfully!');
                setMentorForm({ name: '', email: '', availability: '', bio: '', topic: '', password: '', experience: '' });
                fetchMentors();
            }
            else {
                setFormError('Failed to create mentor.');
            }
        }
        catch (error) {
            setFormError(error.response?.data?.message || 'Failed to create mentor.');
        }
        finally {
            setFormLoading(false);
        }
    };
    const handleDeleteMentor = async (id) => {
        if (!window.confirm('Are you sure you want to delete this mentor?'))
            return;
        setMentorsLoading(true);
        setMentorsError('');
        try {
            await axios.delete(`${backendUrl}/api/deleteMentor/${id}`);
            setMentors(prev => prev.filter(mentor => mentor.id !== id && mentor._id !== id));
        }
        catch (err) {
            setMentorsError(err.response?.data?.message || 'Failed to delete mentor.');
        }
        finally {
            setMentorsLoading(false);
        }
    };
    if (!user || user.role !== 'admin') {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white", children: _jsxs("div", { className: "text-center p-8 bg-white rounded-xl shadow-lg max-w-md", children: [_jsx("div", { className: "text-indigo-600 text-6xl mb-4", children: "\uD83D\uDD12" }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Admin Access Required" }), _jsx("p", { className: "text-gray-600 mb-6", children: "You don't have permission to access this page." }), _jsx("button", { onClick: () => navigate('/'), className: "bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md", children: "Return to Home" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen flex bg-gray-50", children: [_jsxs("aside", { className: "w-72 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white p-6 flex flex-col", children: [_jsxs("div", { className: "flex items-center mb-8", children: [_jsx("div", { className: "bg-white/20 p-2 rounded-lg mr-3", children: _jsxs("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })] }) }), _jsx("h1", { className: "text-2xl font-bold", children: "Admin Console" })] }), _jsx("nav", { className: "flex-1 space-y-2", children: sections.map((section) => (_jsxs("button", { onClick: () => setActiveSection(section.key), className: `w-full flex items-center px-4 py-3 rounded-lg font-medium transition-all ${activeSection === section.key
                                ? 'bg-white/10 shadow-md'
                                : 'hover:bg-white/5'}`, children: [_jsx("span", { className: "mr-3 text-lg", children: section.icon }), section.label] }, section.key))) }), _jsxs("button", { onClick: () => { logout(); navigate('/login'); }, className: "mt-auto flex items-center justify-center bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-colors shadow-sm", children: [_jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) }), "Sign Out"] })] }), _jsx("main", { className: "flex-1 p-8 overflow-auto", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800", children: sections.find(s => s.key === activeSection)?.label }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center", children: _jsx("span", { className: "text-indigo-700 font-medium", children: user.name?.charAt(0) || 'A' }) }), _jsx("span", { className: "text-gray-700", children: user.name || 'Admin' })] })] }), activeSection === 'createMentor' && (_jsxs("section", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-gray-100", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Add New Mentor" }), _jsx("p", { className: "text-gray-500 text-sm", children: "Fill in the details to create a new mentor profile" })] }), _jsx("div", { className: "p-6", children: _jsxs("form", { onSubmit: handleCreateMentor, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name" }), _jsx("input", { type: "text", name: "name", value: mentorForm.name, onChange: handleMentorInput, className: "w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), _jsx("input", { type: "email", name: "email", value: mentorForm.email, onChange: handleMentorInput, className: "w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Availability" }), _jsxs("select", { name: "availability", value: mentorForm.availability, onChange: handleMentorInput, className: "w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500", required: true, children: [_jsx("option", { value: "", children: "Select availability" }), _jsx("option", { value: "NOT-AVAILABLE", children: "Not Available" }), _jsx("option", { value: "AVAILABLE", children: "Available" }), _jsx("option", { value: "PENDING", children: "Pending" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Expertise Topic" }), _jsx("input", { type: "text", name: "topic", value: mentorForm.topic, onChange: handleMentorInput, className: "w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }), _jsx("input", { type: "password", name: "password", value: mentorForm.password, onChange: handleMentorInput, className: "w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Years of Experience" }), _jsx("input", { type: "text", name: "experience", value: mentorForm.experience, onChange: handleMentorInput, className: "w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500", required: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Bio" }), _jsx("textarea", { name: "bio", value: mentorForm.bio, onChange: handleMentorInput, className: "w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500", rows: 4, required: true })] }), formError && (_jsx("div", { className: "md:col-span-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg", children: formError })), formSuccess && (_jsx("div", { className: "md:col-span-2 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg", children: formSuccess })), _jsx("div", { className: "md:col-span-2", children: _jsx("button", { type: "submit", className: "w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors shadow-md flex items-center justify-center", disabled: formLoading, children: formLoading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Creating Mentor..."] })) : ('Create Mentor Profile') }) })] }) })] })), activeSection === 'assignRoles' && (_jsxs("section", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-gray-100", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Role Management" }), _jsx("p", { className: "text-gray-500 text-sm", children: "Assign and manage user roles and permissions" })] }), _jsx("div", { className: "p-6", children: _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-indigo-400 text-5xl mb-4", children: "\uD83D\uDEE0\uFE0F" }), _jsx("h4", { className: "text-lg font-medium text-gray-700 mb-2", children: "Role Assignment Coming Soon" }), _jsx("p", { className: "text-gray-500", children: "We're working on this feature for the next release" })] }) })] })), activeSection === 'bookSessions' && (_jsxs("section", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-gray-100", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Session Booking" }), _jsx("p", { className: "text-gray-500 text-sm", children: "Schedule and manage mentoring sessions" })] }), _jsx("div", { className: "p-6", children: _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-indigo-400 text-5xl mb-4", children: "\uD83D\uDCC5" }), _jsx("h4", { className: "text-lg font-medium text-gray-700 mb-2", children: "Session Management Coming Soon" }), _jsx("p", { className: "text-gray-500", children: "This feature is currently in development" })] }) })] })), activeSection === 'viewMentors' && (_jsxs("section", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Mentor Directory" }), _jsx("p", { className: "text-gray-500 text-sm", children: "View and manage all mentor profiles" })] }), _jsxs("button", { onClick: fetchMentors, className: "text-indigo-600 hover:text-indigo-800 flex items-center text-sm", disabled: mentorsLoading, children: [_jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }), "Refresh"] })] }), _jsx("div", { className: "p-6", children: mentorsLoading ? (_jsx("div", { className: "flex justify-center py-12", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" }) })) : mentorsError ? (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg", children: mentorsError })) : mentors.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-gray-400 text-5xl mb-4", children: "\uD83D\uDC65" }), _jsx("h4", { className: "text-lg font-medium text-gray-700 mb-2", children: "No Mentors Found" }), _jsx("p", { className: "text-gray-500", children: "Create your first mentor using the \"Create Mentor\" section" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Expertise" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Experience" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: mentors.map((mentor, idx) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-indigo-600 font-medium", children: mentor.name?.charAt(0) || 'M' }) }), _jsx("div", { className: "ml-4", children: _jsx("div", { className: "text-sm font-medium text-gray-900", children: mentor.name }) })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: mentor.email }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${mentor.availability === 'AVAILABLE'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : mentor.availability === 'PENDING'
                                                                            ? 'bg-yellow-100 text-yellow-800'
                                                                            : 'bg-red-100 text-red-800'}`, children: mentor.availability === 'AVAILABLE' ? 'Available' : mentor.availability === 'PENDING' ? 'Pending' : 'Unavailable' }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: mentor.topic }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [mentor.experience, " years"] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: _jsx("button", { onClick: () => handleDeleteMentor(mentor.id || mentor._id), className: "text-red-600 hover:text-red-900 disabled:text-red-300", disabled: mentorsLoading, children: "Delete" }) })] }, mentor.id || mentor._id || idx))) })] }) })) })] }))] }) })] }));
};
export default AdminDashboard;
