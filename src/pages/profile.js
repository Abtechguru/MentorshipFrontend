import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
function profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        personalInfo: {
            name: user?.name || 'Tunde Kamar',
            email: user?.email || 'tunde.kamar@example.com',
            location: 'Lagos, NIG',
            experience: '3 years in web development'
        },
        about: {
            bio: 'Full-stack developer passionate about creating intuitive user experiences. I thrive in collaborative environments and believe mentorship accelerates growth. Currently expanding my expertise in cloud architecture and scalable systems.',
            interests: ['UI/UX Design', 'DevOps', 'Technical Writing', 'Hiking', 'Photography']
        },
        professional: {
            skills: ['TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'GraphQL'],
            goals: [
                'Obtain AWS Certified Solutions Architect certification',
                'Master microservices architecture',
                'Contribute to three open-source projects',
                'Develop leadership skills through mentorship',
                'Attend two tech conferences annually'
            ]
        }
    });
    const [inputState, setInputState] = useState({
        skill: '',
        goal: '',
        interest: ''
    });
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputState(prev => ({ ...prev, [name]: value }));
    };
    const addItem = (category, arrayKey) => {
        const value = inputState[category].trim();
        if (value) {
            if (arrayKey === 'about' && category === 'interest') {
                if (!profile.about.interests.includes(value)) {
                    setProfile(prev => ({
                        ...prev,
                        about: {
                            ...prev.about,
                            interests: [...prev.about.interests, value]
                        }
                    }));
                    setInputState(prev => ({ ...prev, interest: '' }));
                }
            }
            else if (arrayKey === 'professional') {
                if (category === 'skill' && !profile.professional.skills.includes(value)) {
                    setProfile(prev => ({
                        ...prev,
                        professional: {
                            ...prev.professional,
                            skills: [...prev.professional.skills, value]
                        }
                    }));
                    setInputState(prev => ({ ...prev, skill: '' }));
                }
                else if (category === 'goal' && !profile.professional.goals.includes(value)) {
                    setProfile(prev => ({
                        ...prev,
                        professional: {
                            ...prev.professional,
                            goals: [...prev.professional.goals, value]
                        }
                    }));
                    setInputState(prev => ({ ...prev, goal: '' }));
                }
            }
        }
    };
    const removeItem = (arrayKey, item) => {
        if (arrayKey === 'about') {
            setProfile(prev => ({
                ...prev,
                about: {
                    ...prev.about,
                    interests: prev.about.interests.filter(i => i !== item)
                }
            }));
        }
        else {
            if (profile.professional.skills.includes(item)) {
                setProfile(prev => ({
                    ...prev,
                    professional: {
                        ...prev.professional,
                        skills: prev.professional.skills.filter(i => i !== item)
                    }
                }));
            }
            else {
                setProfile(prev => ({
                    ...prev,
                    professional: {
                        ...prev.professional,
                        goals: prev.professional.goals.filter(i => i !== item)
                    }
                }));
            }
        }
    };
    if (!user) {
        return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4", children: _jsxs("div", { className: "max-w-md text-center space-y-4", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800", children: "Authentication Required" }), _jsx("p", { className: "text-gray-600", children: "Please sign in to access your personalized profile dashboard." }), _jsx("button", { onClick: () => navigate('/login'), className: "px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors", children: "Sign In" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("header", { className: "bg-white shadow-sm", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "My Professional Profile" }), _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { onClick: () => setEditMode(!editMode), className: `px-4 py-2 rounded-lg transition-colors ${editMode
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`, children: editMode ? 'Save Changes' : 'Edit Profile' }), _jsx("button", { onClick: handleLogout, className: "px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors", children: "Sign Out" })] })] }) }), _jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsx("aside", { className: "lg:col-span-1 space-y-6", children: _jsx("div", { className: "bg-white rounded-xl shadow-md p-6 sticky top-8", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "w-32 h-32 mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold", children: profile.personalInfo.name.charAt(0) }), _jsx("h2", { className: "text-xl font-bold text-center text-gray-800", children: profile.personalInfo.name }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: profile.personalInfo.email }), profile.personalInfo.location && (_jsxs("div", { className: "mt-4 flex items-center text-gray-600", children: [_jsx("svg", { className: "w-4 h-4 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) }), profile.personalInfo.location] })), profile.personalInfo.experience && (_jsx("div", { className: "mt-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium", children: profile.personalInfo.experience }))] }) }) }), _jsxs("section", { className: "lg:col-span-3 space-y-6", children: [_jsx("article", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("svg", { className: "w-6 h-6 text-cyan-600 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Professional Summary" })] }), editMode ? (_jsx("textarea", { value: profile.about.bio, onChange: (e) => setProfile(prev => ({
                                                    ...prev,
                                                    about: { ...prev.about, bio: e.target.value }
                                                })), className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent", rows: 5 })) : (_jsx("p", { className: "text-gray-700 leading-relaxed", children: profile.about.bio }))] }) }), _jsx("article", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("svg", { className: "w-6 h-6 text-emerald-600 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Technical Proficiencies" })] }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: profile.professional.skills.map((skill, index) => (_jsxs("span", { className: "bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium flex items-center", children: [skill, editMode && (_jsx("button", { onClick: () => removeItem('professional', skill), className: "ml-1.5 text-emerald-600 hover:text-emerald-900", children: "\u00D7" }))] }, index))) }), editMode && (_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", name: "skill", value: inputState.skill, onChange: handleInputChange, onKeyPress: (e) => e.key === 'Enter' && addItem('skill', 'professional'), placeholder: "Add technical skill...", className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" }), _jsx("button", { onClick: () => addItem('skill', 'professional'), className: "px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors", children: "Add" })] }))] }) }), _jsx("article", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("svg", { className: "w-6 h-6 text-violet-600 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z", clipRule: "evenodd" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Career Objectives" })] }), _jsx("ul", { className: "space-y-3 mb-4", children: profile.professional.goals.map((goal, index) => (_jsxs("li", { className: "flex items-start p-3 bg-violet-50 rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-violet-500 rounded-full mt-2 mr-3 flex-shrink-0" }), _jsx("span", { className: "text-gray-700 flex-1", children: goal }), editMode && (_jsx("button", { onClick: () => removeItem('professional', goal), className: "text-violet-600 hover:text-violet-900 ml-2", children: "\u00D7" }))] }, index))) }), editMode && (_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", name: "goal", value: inputState.goal, onChange: handleInputChange, onKeyPress: (e) => e.key === 'Enter' && addItem('goal', 'professional'), placeholder: "Add career goal...", className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent" }), _jsx("button", { onClick: () => addItem('goal', 'professional'), className: "px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors", children: "Add" })] }))] }) }), _jsx("article", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("svg", { className: "w-6 h-6 text-amber-600 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z", clipRule: "evenodd" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-800", children: "Personal Interests" })] }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: profile.about.interests.map((interest, index) => (_jsxs("span", { className: "bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center", children: [interest, editMode && (_jsx("button", { onClick: () => removeItem('about', interest), className: "ml-1.5 text-amber-600 hover:text-amber-900", children: "\u00D7" }))] }, index))) }), editMode && (_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", name: "interest", value: inputState.interest, onChange: handleInputChange, onKeyPress: (e) => e.key === 'Enter' && addItem('interest', 'about'), placeholder: "Add personal interest...", className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" }), _jsx("button", { onClick: () => addItem('interest', 'about'), className: "px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors", children: "Add" })] }))] }) })] })] }) })] }));
}
export default profile;
