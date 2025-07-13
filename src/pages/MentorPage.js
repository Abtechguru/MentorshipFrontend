import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useShopContext } from '../context';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
function MentorPage() {
    const context = useShopContext();
    const backendUrl = context?.backendUrl || "";
    const { user } = useAuth();
    const navigate = useNavigate();
    const [mentors, setMentors] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    // Discovery filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExpertise, setSelectedExpertise] = useState([]);
    const [seniorityFilter, setSeniorityFilter] = useState('');
    const [sortPreference, setSortPreference] = useState('recommended');
    const [availabilityFilter, setAvailabilityFilter] = useState(false);
    // Available expertise areas
    const expertiseOptions = [
        'Frontend Architecture', 'Cloud Solutions', 'Data Engineering',
        'Technical Leadership', 'Career Growth', 'Interview Coaching',
        'Startup Strategy', 'DevOps Practices', 'Product Development',
        'UX Research', 'Technical Writing', 'Open Source Contribution'
    ];
    useEffect(() => {
        fetchMentorProfiles();
    }, []);
    useEffect(() => {
        applyDiscoveryFilters();
    }, [mentors, searchQuery, selectedExpertise, seniorityFilter, sortPreference, availabilityFilter]);
    const fetchMentorProfiles = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${backendUrl}/api/mentors`);
            if (Array.isArray(response.data?.profiles)) {
                setMentors(response.data.profiles);
            }
            else {
                // Fallback demonstration data
                setMentors([
                    {
                        id: 'm1',
                        name: 'Dr. Elena Rodriguez',
                        title: 'Principal Engineer',
                        email: 'elena.tech@example.com',
                        bio: 'Technology leader specializing in scaling engineering teams and architecting resilient systems. My mentorship focuses on leadership development and technical decision-making.',
                        expertise: ['Technical Leadership', 'System Design', 'Career Growth'],
                        yearsInField: '12',
                        location: 'Remote (Global)',
                        sessionFee: 120,
                        satisfactionScore: 4.9,
                        focusArea: 'Engineering Leadership',
                        mentorshipStyle: 'Structured coaching with actionable milestones'
                    },
                    {
                        id: 'm2',
                        name: 'James Chen',
                        title: 'Data Platform Architect',
                        email: 'james.data@example.com',
                        bio: 'Building data infrastructure that scales. I mentor professionals transitioning into data engineering roles or looking to deepen their distributed systems knowledge.',
                        expertise: ['Data Engineering', 'Cloud Solutions', 'DevOps Practices'],
                        yearsInField: '8',
                        location: 'San Francisco, CA',
                        sessionFee: 95,
                        satisfactionScore: 4.8,
                        focusArea: 'Data Infrastructure',
                        mentorshipStyle: 'Hands-on problem solving'
                    },
                    {
                        id: 'm3',
                        name: 'Priya Kapoor',
                        title: 'UX Research Lead',
                        email: 'priya.ux@example.com',
                        bio: 'Bridging the gap between users and products through research. I mentor designers and PMs looking to strengthen their user research practice and stakeholder management.',
                        expertise: ['UX Research', 'Product Development', 'Technical Writing'],
                        yearsInField: '6',
                        location: 'New York, NY',
                        sessionFee: 85,
                        satisfactionScore: 4.7,
                        focusArea: 'User-Centered Design',
                        mentorshipStyle: 'Case study based learning'
                    }
                ]);
            }
        }
        catch (error) {
            console.error('Error fetching mentors:', error);
            setErrorMessage('We encountered an issue loading mentor profiles. Our team has been notified.');
        }
        finally {
            setIsLoading(false);
        }
    };
    const applyDiscoveryFilters = () => {
        let results = [...mentors];
        // Text search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(mentor => mentor.name.toLowerCase().includes(query) ||
                mentor.bio.toLowerCase().includes(query) ||
                (mentor.expertise && mentor.expertise.some(area => area.toLowerCase().includes(query))));
        }
        // Expertise filter
        if (selectedExpertise.length > 0) {
            results = results.filter(mentor => mentor.expertise && mentor.expertise.some(area => selectedExpertise.includes(area)));
        }
        // Seniority filter
        if (seniorityFilter) {
            results = results.filter(mentor => parseInt(mentor.yearsInField) >= parseInt(seniorityFilter));
        }
        // Availability filter
        if (availabilityFilter) {
            results = results.filter(mentor => mentor.availability === 'Available' || mentor.availability === 'Flexible');
        }
        // Sorting
        results.sort((a, b) => {
            switch (sortPreference) {
                case 'experience':
                    return parseInt(b.yearsInField) - parseInt(a.yearsInField);
                case 'satisfaction':
                    return (b.satisfactionScore || 0) - (a.satisfactionScore || 0);
                case 'fee':
                    return (a.sessionFee || 0) - (b.sessionFee || 0);
                default: // recommended
                    return (b.satisfactionScore || 0) * 0.7 + (parseInt(b.yearsInField) * 0.3) -
                        ((a.satisfactionScore || 0) * 0.7 + (parseInt(a.yearsInField) * 0.3));
            }
        });
        setFilteredMentors(results);
    };
    const toggleExpertiseSelection = (expertise) => {
        setSelectedExpertise(prev => prev.includes(expertise)
            ? prev.filter(e => e !== expertise)
            : [...prev, expertise]);
    };
    const resetDiscoveryFilters = () => {
        setSearchQuery('');
        setSelectedExpertise([]);
        setSeniorityFilter('');
        setSortPreference('recommended');
        setAvailabilityFilter(false);
    };
    const viewMentorProfile = (mentorId) => {
        navigate(`/mentors/${mentorId}`);
    };
    if (!user) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50", children: _jsxs("div", { className: "bg-white p-8 rounded-xl shadow-lg max-w-md text-center", children: [_jsx("div", { className: "text-indigo-600 text-5xl mb-4", children: "\uD83D\uDD12" }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Join Our Learning Community" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Sign in to connect with industry experts and accelerate your growth" }), _jsx("button", { onClick: () => navigate('/login'), className: "w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md", children: "Sign In to Continue" })] }) }));
    }
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4" }), _jsx("p", { className: "text-gray-600", children: "Discovering exceptional mentors..." })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50", children: [_jsx("div", { className: "bg-white shadow-sm", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-3", children: "Find Your Professional Guide" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Connect with seasoned experts who can help you navigate your career journey" })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 mb-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Search Mentors" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }) }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name, expertise, or keywords...", className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Minimum Experience" }), _jsxs("select", { value: seniorityFilter, onChange: (e) => setSeniorityFilter(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent", children: [_jsx("option", { value: "", children: "Any experience" }), _jsx("option", { value: "3", children: "3+ years" }), _jsx("option", { value: "5", children: "5+ years" }), _jsx("option", { value: "8", children: "8+ years" }), _jsx("option", { value: "10", children: "10+ years" })] })] }), _jsx("div", { className: "flex items-end", children: _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", checked: availabilityFilter, onChange: (e) => setAvailabilityFilter(e.target.checked), className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5" }), _jsx("span", { className: "text-sm text-gray-700", children: "Currently available" })] }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Sort By" }), _jsxs("select", { value: sortPreference, onChange: (e) => setSortPreference(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent", children: [_jsx("option", { value: "recommended", children: "Recommended" }), _jsx("option", { value: "experience", children: "Most experienced" }), _jsx("option", { value: "satisfaction", children: "Highest rated" }), _jsx("option", { value: "fee", children: "Lowest fee" })] })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Areas of Expertise" }), _jsx("div", { className: "flex flex-wrap gap-2", children: expertiseOptions.map(expertise => (_jsx("button", { onClick: () => toggleExpertiseSelection(expertise), className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedExpertise.includes(expertise)
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, children: expertise }, expertise))) })] }), (selectedExpertise.length > 0 || seniorityFilter || availabilityFilter) && (_jsxs("div", { className: "mt-4 flex items-center flex-wrap gap-2", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Active filters:" }), selectedExpertise.map(expertise => (_jsxs("span", { className: "bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs flex items-center", children: [expertise, _jsx("button", { onClick: () => toggleExpertiseSelection(expertise), className: "ml-1 text-indigo-500 hover:text-indigo-700", children: "\u00D7" })] }, expertise))), seniorityFilter && (_jsxs("span", { className: "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center", children: [seniorityFilter, "+ years", _jsx("button", { onClick: () => setSeniorityFilter(''), className: "ml-1 text-blue-500 hover:text-blue-700", children: "\u00D7" })] })), availabilityFilter && (_jsxs("span", { className: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center", children: ["Available", _jsx("button", { onClick: () => setAvailabilityFilter(false), className: "ml-1 text-green-500 hover:text-green-700", children: "\u00D7" })] })), _jsx("button", { onClick: resetDiscoveryFilters, className: "text-sm text-indigo-600 hover:text-indigo-800 ml-2", children: "Clear all" })] }))] }), _jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-800", children: [filteredMentors.length, " professional ", filteredMentors.length === 1 ? 'mentor' : 'mentors', " matching your criteria"] }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Showing ", filteredMentors.length, " of ", mentors.length, " available guides"] })] }), errorMessage && (_jsx("div", { className: "bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("svg", { className: "h-5 w-5 text-red-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }) }), _jsx("div", { className: "ml-3", children: _jsx("p", { className: "text-sm text-red-700", children: errorMessage }) })] }) })), filteredMentors.length === 0 ? (_jsxs("div", { className: "bg-white rounded-2xl shadow-sm p-12 text-center", children: [_jsx("div", { className: "mx-auto h-24 w-24 text-gray-400 mb-4", children: _jsx("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No mentors match your current filters" }), _jsx("p", { className: "text-gray-500 max-w-md mx-auto", children: "Try adjusting your search criteria or explore our full mentor directory" }), _jsx("button", { onClick: resetDiscoveryFilters, className: "mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Reset all filters" })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredMentors.map(mentor => (_jsxs("div", { className: "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300", children: [_jsx("div", { className: "bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "h-16 w-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl font-bold", children: mentor.name.charAt(0).toUpperCase() }) }), _jsxs("div", { className: "ml-4", children: [_jsx("h3", { className: "text-lg font-bold", children: mentor.name }), _jsx("p", { className: "text-blue-100", children: mentor.title })] })] }) }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center text-sm text-gray-500 mb-4", children: [_jsx("svg", { className: "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) }), mentor.location || 'Remote'] }), _jsx("p", { className: "text-gray-700 text-sm mb-4 line-clamp-3", children: mentor.bio }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2", children: "Specializes in" }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [mentor.expertise.slice(0, 3).map(skill => (_jsx("span", { className: "bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs", children: skill }, skill))), mentor.expertise.length > 3 && (_jsxs("span", { className: "bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs", children: ["+", mentor.expertise.length - 3, " more"] }))] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm mb-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-500", children: "Experience" }), _jsxs("p", { className: "font-medium", children: [mentor.yearsInField, " years"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-500", children: "Session Fee" }), _jsxs("p", { className: "font-medium", children: ["$", mentor.sessionFee, "/hr"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-500", children: "Rating" }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "font-medium mr-1", children: mentor.satisfactionScore?.toFixed(1) }), _jsx("svg", { className: "h-4 w-4 text-yellow-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-500", children: "Style" }), _jsxs("p", { className: "font-medium truncate", title: mentor.mentorshipStyle, children: [mentor.mentorshipStyle?.split(' ')[0], "..."] })] })] }), _jsx("button", { onClick: () => viewMentorProfile(mentor.id), className: "w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm", children: "View Full Profile" })] })] }, mentor.id))) }))] })] }));
}
export default MentorPage;
