import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
const BecomeMentor = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        currentRole: '',
        company: '',
        yearsOfExperience: '',
        industry: '',
        specialization: '',
        skills: [],
        certifications: [],
        languages: [],
        mentorshipAreas: [],
        availability: '',
        hourlyRate: '',
        maxMentees: '',
        bio: '',
        motivation: '',
        successStories: '',
        agreeToTerms: false,
        agreeToPrivacy: false,
        agreeToCodeOfConduct: false
    });
    const [errors, setErrors] = useState({});
    const industries = [
        'Software Development', 'Data Science', 'Machine Learning', 'Web Development',
        'Mobile Development', 'DevOps', 'Cloud Computing', 'Cybersecurity',
        'Product Management', 'UI/UX Design', 'Digital Marketing', 'Business',
        'Finance', 'Healthcare', 'Education', 'Other'
    ];
    const skillOptions = [
        'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'TypeScript',
        'Angular', 'Vue.js', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
        'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins',
        'Git', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
        'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Tableau',
        'Power BI', 'Figma', 'Adobe XD', 'Sketch', 'Agile', 'Scrum', 'Kanban'
    ];
    const mentorshipAreas = [
        'Career Guidance', 'Technical Skills', 'Interview Preparation', 'Project Management',
        'Leadership Development', 'Communication Skills', 'Problem Solving', 'Code Review',
        'System Design', 'Architecture', 'Testing', 'Performance Optimization',
        'Security Best Practices', 'DevOps Practices', 'Cloud Migration', 'Startup Advice'
    ];
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const checked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const handleArrayChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };
    const validateStep = (step) => {
        const newErrors = {};
        switch (step) {
            case 1:
                if (!formData.firstName.trim())
                    newErrors.firstName = 'First name is required';
                if (!formData.lastName.trim())
                    newErrors.lastName = 'Last name is required';
                if (!formData.email.trim())
                    newErrors.email = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(formData.email))
                    newErrors.email = 'Email is invalid';
                if (!formData.phone.trim())
                    newErrors.phone = 'Phone number is required';
                if (!formData.location.trim())
                    newErrors.location = 'Location is required';
                break;
            case 2:
                if (!formData.currentRole.trim())
                    newErrors.currentRole = 'Current role is required';
                if (!formData.company.trim())
                    newErrors.company = 'Company is required';
                if (!formData.yearsOfExperience)
                    newErrors.yearsOfExperience = 'Years of experience is required';
                if (!formData.industry)
                    newErrors.industry = 'Industry is required';
                if (!formData.specialization.trim())
                    newErrors.specialization = 'Specialization is required';
                break;
            case 3:
                if (formData.skills.length === 0)
                    newErrors.skills = 'Please select at least one skill';
                if (formData.mentorshipAreas.length === 0)
                    newErrors.mentorshipAreas = 'Please select at least one mentorship area';
                break;
            case 4:
                if (!formData.bio.trim())
                    newErrors.bio = 'Bio is required';
                if (!formData.motivation.trim())
                    newErrors.motivation = 'Motivation is required';
                if (!formData.availability)
                    newErrors.availability = 'Availability is required';
                if (!formData.hourlyRate)
                    newErrors.hourlyRate = 'Hourly rate is required';
                break;
            case 5:
                if (!formData.agreeToTerms)
                    newErrors.agreeToTerms = 'You must agree to the terms and conditions';
                if (!formData.agreeToPrivacy)
                    newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
                if (!formData.agreeToCodeOfConduct)
                    newErrors.agreeToCodeOfConduct = 'You must agree to the code of conduct';
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 5));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            try {
                console.log('Form submitted:', formData);
                alert('Application submitted successfully! Our team will review your application within 3-5 business days.');
                navigate('/profile');
            }
            catch (error) {
                console.error('Error submitting application:', error);
                alert('There was an error submitting your application. Please try again.');
            }
        }
    };
    if (!isAuthenticated) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50", children: _jsxs("div", { className: "bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 text-center", children: [_jsx("div", { className: "text-blue-600 text-5xl mb-4", children: "\uD83D\uDD12" }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Authentication Required" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Please sign in to access the mentor application form." }), _jsx("button", { onClick: () => navigate('/login'), className: "w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm", children: "Sign In" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50", children: [_jsx("header", { className: "bg-white shadow-sm", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Become a Mentor" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Share your expertise and guide the next generation of professionals" })] }), _jsxs("button", { onClick: () => navigate('/profile'), className: "flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200", children: [_jsx("svg", { className: "w-5 h-5 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), "Back to Profile"] })] }) }) }), _jsxs("main", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "mb-12", children: [_jsx("div", { className: "flex items-center justify-between mb-4", children: [1, 2, 3, 4, 5].map(step => (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: `w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold mb-2 transition-colors duration-200 ${step < currentStep
                                                ? 'bg-green-100 text-green-600'
                                                : step === currentStep
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'bg-white text-gray-400 border-2 border-gray-200'}`, children: step }), _jsxs("span", { className: `text-sm font-medium ${step <= currentStep ? 'text-gray-900' : 'text-gray-500'}`, children: [step === 1 && 'Personal', step === 2 && 'Professional', step === 3 && 'Skills', step === 4 && 'Mentorship', step === 5 && 'Review'] })] }, step))) }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute top-1/2 h-1 bg-gray-200 w-full -z-10" }), _jsx("div", { className: "absolute top-1/2 h-1 bg-blue-600 transition-all duration-300 -z-10", style: { width: `${(currentStep - 1) * 25}%` } })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-xl shadow-md overflow-hidden", children: [currentStep === 1 && (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Personal Information" }), _jsx("p", { className: "text-gray-600", children: "Let's start with some basic details about you" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["First Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", name: "firstName", value: formData.firstName, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.firstName ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "John" }), errors.firstName && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.firstName })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Last Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", name: "lastName", value: formData.lastName, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.lastName ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "Doe" }), errors.lastName && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.lastName })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Email ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "john.doe@example.com" }), errors.email && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.email })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Phone Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "tel", name: "phone", value: formData.phone, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.phone ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "+1 (555) 123-4567" }), errors.phone && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.phone })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Location ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", name: "location", value: formData.location, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.location ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "City, Country" }), errors.location && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.location })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "LinkedIn Profile" }), _jsxs("div", { className: "flex", children: [_jsx("span", { className: "inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm", children: "linkedin.com/in/" }), _jsx("input", { type: "text", name: "linkedin", value: formData.linkedin, onChange: handleInputChange, className: "flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors duration-200", placeholder: "yourusername" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "GitHub Profile" }), _jsxs("div", { className: "flex", children: [_jsx("span", { className: "inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm", children: "github.com/" }), _jsx("input", { type: "text", name: "github", value: formData.github, onChange: handleInputChange, className: "flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors duration-200", placeholder: "yourusername" })] })] })] })] })), currentStep === 2 && (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Professional Background" }), _jsx("p", { className: "text-gray-600", children: "Tell us about your career and experience" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Current Role ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", name: "currentRole", value: formData.currentRole, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.currentRole ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "Senior Software Engineer" }), errors.currentRole && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.currentRole })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Company ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", name: "company", value: formData.company, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.company ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "Acme Inc." }), errors.company && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.company })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Years of Experience ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { name: "yearsOfExperience", value: formData.yearsOfExperience, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, children: [_jsx("option", { value: "", children: "Select your experience" }), _jsx("option", { value: "1-2", children: "1-2 years" }), _jsx("option", { value: "3-5", children: "3-5 years" }), _jsx("option", { value: "6-10", children: "6-10 years" }), _jsx("option", { value: "11-15", children: "11-15 years" }), _jsx("option", { value: "15+", children: "15+ years" })] }), errors.yearsOfExperience && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.yearsOfExperience })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Industry ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { name: "industry", value: formData.industry, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.industry ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, children: [_jsx("option", { value: "", children: "Select your industry" }), industries.map(industry => (_jsx("option", { value: industry, children: industry }, industry)))] }), errors.industry && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.industry })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Specialization ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", name: "specialization", value: formData.specialization, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.specialization ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "e.g., Full-stack development, Machine Learning, DevOps" }), errors.specialization && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.specialization })] })] })] })), currentStep === 3 && (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Skills & Expertise" }), _jsx("p", { className: "text-gray-600", children: "Select your technical skills and areas where you can mentor others" })] }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: ["Technical Skills ", _jsx("span", { className: "text-red-500", children: "*" }), errors.skills && _jsx("span", { className: "text-red-500 ml-2", children: errors.skills })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3", children: skillOptions.map(skill => (_jsxs("label", { className: "flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors duration-200", children: [_jsx("input", { type: "checkbox", checked: formData.skills.includes(skill), onChange: () => handleArrayChange('skills', skill), className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5" }), _jsx("span", { className: "text-sm text-gray-700", children: skill })] }, skill))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: ["Mentorship Areas ", _jsx("span", { className: "text-red-500", children: "*" }), errors.mentorshipAreas && _jsx("span", { className: "text-red-500 ml-2", children: errors.mentorshipAreas })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: mentorshipAreas.map(area => (_jsxs("label", { className: "flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors duration-200", children: [_jsx("input", { type: "checkbox", checked: formData.mentorshipAreas.includes(area), onChange: () => handleArrayChange('mentorshipAreas', area), className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5" }), _jsx("span", { className: "text-sm text-gray-700", children: area })] }, area))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Certifications (Optional)" }), _jsx("textarea", { name: "certifications", value: formData.certifications.join(', '), onChange: (e) => setFormData(prev => ({
                                                            ...prev,
                                                            certifications: e.target.value.split(',').map(cert => cert.trim()).filter(cert => cert)
                                                        })), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200", rows: 3, placeholder: "AWS Certified Solutions Architect, Google Cloud Professional, etc." })] })] })] })), currentStep === 4 && (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Mentorship Details" }), _jsx("p", { className: "text-gray-600", children: "Define your mentoring approach and availability" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Availability ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { name: "availability", value: formData.availability, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.availability ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, children: [_jsx("option", { value: "", children: "Select your availability" }), _jsx("option", { value: "1-5", children: "1-5 hours/week" }), _jsx("option", { value: "5-10", children: "5-10 hours/week" }), _jsx("option", { value: "10-15", children: "10-15 hours/week" }), _jsx("option", { value: "15+", children: "15+ hours/week" })] }), errors.availability && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.availability })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Hourly Rate (USD) ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("span", { className: "text-gray-500", children: "$" }) }), _jsx("input", { type: "number", name: "hourlyRate", value: formData.hourlyRate, onChange: handleInputChange, className: `w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.hourlyRate ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, placeholder: "50", min: "0" })] }), errors.hourlyRate && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.hourlyRate })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Maximum Mentees" }), _jsxs("select", { name: "maxMentees", value: formData.maxMentees, onChange: handleInputChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200", children: [_jsx("option", { value: "", children: "Select maximum mentees" }), _jsx("option", { value: "1-2", children: "1-2 mentees" }), _jsx("option", { value: "3-5", children: "3-5 mentees" }), _jsx("option", { value: "6-10", children: "6-10 mentees" }), _jsx("option", { value: "10+", children: "10+ mentees" })] })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Professional Bio ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { name: "bio", value: formData.bio, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.bio ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, rows: 5, placeholder: "Tell us about your background, experience, and what makes you a great mentor..." }), errors.bio && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.bio })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: ["Why do you want to become a mentor? ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { name: "motivation", value: formData.motivation, onChange: handleInputChange, className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.motivation ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}`, rows: 5, placeholder: "Share your motivation for becoming a mentor and how you plan to help others..." }), errors.motivation && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.motivation })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Success Stories (Optional)" }), _jsx("textarea", { name: "successStories", value: formData.successStories, onChange: handleInputChange, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200", rows: 5, placeholder: "Share any success stories from your career or previous mentoring experiences..." })] })] })] })), currentStep === 5 && (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Review & Submit" }), _jsx("p", { className: "text-gray-600", children: "Please review your information and accept our terms" })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-3", children: "Mentor Requirements" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-700", children: [_jsx("li", { children: "Minimum 2 years of professional experience in your field" }), _jsx("li", { children: "Strong communication and teaching skills" }), _jsx("li", { children: "Commitment to helping others grow and succeed" }), _jsx("li", { children: "Availability for regular mentoring sessions" }), _jsx("li", { children: "Professional conduct and ethical behavior" }), _jsx("li", { children: "Up-to-date knowledge in your area of expertise" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-3", children: "Code of Conduct" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-700", children: [_jsx("li", { children: "Treat all mentees with respect and professionalism" }), _jsx("li", { children: "Maintain confidentiality of mentee information" }), _jsx("li", { children: "Provide honest, constructive feedback" }), _jsx("li", { children: "Respect mentee boundaries and time commitments" }), _jsx("li", { children: "Report any inappropriate behavior or concerns" }), _jsx("li", { children: "Follow platform guidelines and policies" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-3", children: "Platform Policies" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 text-gray-700", children: [_jsx("li", { children: "Platform takes a 15% commission on all paid sessions" }), _jsx("li", { children: "Payment processing fees may apply" }), _jsx("li", { children: "Mentors are responsible for their own tax obligations" }), _jsx("li", { children: "Platform reserves the right to review and approve mentor applications" }), _jsx("li", { children: "Mentors can be removed for violations of platform policies" })] })] })] }), _jsxs("div", { className: "space-y-4 mt-8", children: [_jsxs("label", { className: "flex items-start space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", name: "agreeToTerms", checked: formData.agreeToTerms, onChange: handleInputChange, className: "mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5" }), _jsxs("div", { children: [_jsxs("span", { className: "text-sm font-medium text-gray-700", children: ["I agree to the Terms and Conditions ", _jsx("span", { className: "text-red-500", children: "*" })] }), errors.agreeToTerms && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.agreeToTerms })] })] }), _jsxs("label", { className: "flex items-start space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", name: "agreeToPrivacy", checked: formData.agreeToPrivacy, onChange: handleInputChange, className: "mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5" }), _jsxs("div", { children: [_jsxs("span", { className: "text-sm font-medium text-gray-700", children: ["I agree to the Privacy Policy ", _jsx("span", { className: "text-red-500", children: "*" })] }), errors.agreeToPrivacy && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.agreeToPrivacy })] })] }), _jsxs("label", { className: "flex items-start space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", name: "agreeToCodeOfConduct", checked: formData.agreeToCodeOfConduct, onChange: handleInputChange, className: "mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5" }), _jsxs("div", { children: [_jsxs("span", { className: "text-sm font-medium text-gray-700", children: ["I agree to follow the Code of Conduct ", _jsx("span", { className: "text-red-500", children: "*" })] }), errors.agreeToCodeOfConduct && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.agreeToCodeOfConduct })] })] })] })] })), _jsxs("div", { className: "flex justify-between p-6 border-t border-gray-200 bg-gray-50", children: [_jsx("button", { type: "button", onClick: prevStep, disabled: currentStep === 1, className: `px-6 py-3 border rounded-lg font-medium transition-colors duration-200 ${currentStep === 1
                                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`, children: "Previous" }), currentStep < 5 ? (_jsx("button", { type: "button", onClick: nextStep, className: "px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm", children: "Continue" })) : (_jsx("button", { type: "submit", className: "px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm", children: "Submit Application" }))] })] })] })] }));
};
export default BecomeMentor;
