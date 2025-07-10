import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  currentRole: string;
  company: string;
  yearsOfExperience: string;
  industry: string;
  specialization: string;
  skills: string[];
  certifications: string[];
  languages: string[];
  mentorshipAreas: string[];
  availability: string;
  hourlyRate: string;
  maxMentees: string;
  bio: string;
  motivation: string;
  successStories: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  agreeToCodeOfConduct: boolean;
}

interface Errors {
  [key: string]: string;
}

const BecomeMentor: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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

  const [errors, setErrors] = useState<Errors>({});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
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

  const handleArrayChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Errors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        break;

      case 2:
        if (!formData.currentRole.trim()) newErrors.currentRole = 'Current role is required';
        if (!formData.company.trim()) newErrors.company = 'Company is required';
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
        break;

      case 3:
        if (formData.skills.length === 0) newErrors.skills = 'Please select at least one skill';
        if (formData.mentorshipAreas.length === 0) newErrors.mentorshipAreas = 'Please select at least one mentorship area';
        break;

      case 4:
        if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
        if (!formData.motivation.trim()) newErrors.motivation = 'Motivation is required';
        if (!formData.availability) newErrors.availability = 'Availability is required';
        if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required';
        break;

      case 5:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
        if (!formData.agreeToCodeOfConduct) newErrors.agreeToCodeOfConduct = 'You must agree to the code of conduct';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        console.log('Form submitted:', formData);
        alert('Application submitted successfully! We will review your application and get back to you within 3-5 business days.');
        navigate('/profile');
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('There was an error submitting your application. Please try again.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-indigo-600 text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access the mentor application form.</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Join Our Mentor Network</h1>
              <p className="text-gray-600 mt-2">Share your knowledge and help shape the next generation of professionals</p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold mb-2 ${
                  step < currentStep 
                    ? 'bg-green-100 text-green-600' 
                    : step === currentStep 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-white text-gray-400 border-2 border-gray-300'
                }`}>
                  {step}
                </div>
                <span className={`text-sm font-medium ${
                  step <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Professional'}
                  {step === 3 && 'Skills'}
                  {step === 4 && 'Mentorship'}
                  {step === 5 && 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-1/2 h-1 bg-gray-200 w-full -z-10"></div>
            <div 
              className="absolute top-1/2 h-1 bg-indigo-600 transition-all duration-300 -z-10" 
              style={{ width: `${(currentStep - 1) * 25}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="City, Country"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      linkedin.com/in/
                    </span>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="yourusername"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      github.com/
                    </span>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="yourusername"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Background */}
          {currentStep === 2 && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Background</h2>
                <p className="text-gray-600">Tell us about your career experience</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.currentRole ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Senior Software Engineer"
                  />
                  {errors.currentRole && <p className="text-red-500 text-sm mt-1">{errors.currentRole}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Acme Inc."
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your experience</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="15+">15+ years</option>
                  </select>
                  {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.industry ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.specialization ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Full-stack development, Machine Learning, DevOps"
                  />
                  {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Expertise */}
          {currentStep === 3 && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Expertise</h2>
                <p className="text-gray-600">Select your technical skills and mentorship areas</p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Technical Skills <span className="text-red-500">*</span>
                    {errors.skills && <span className="text-red-500 ml-2">{errors.skills}</span>}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {skillOptions.map(skill => (
                      <label key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleArrayChange('skills', skill)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                        />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Mentorship Areas <span className="text-red-500">*</span>
                    {errors.mentorshipAreas && <span className="text-red-500 ml-2">{errors.mentorshipAreas}</span>}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {mentorshipAreas.map(area => (
                      <label key={area} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.mentorshipAreas.includes(area)}
                          onChange={() => handleArrayChange('mentorshipAreas', area)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                        />
                        <span className="text-sm text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certifications (Optional)</label>
                  <textarea
                    name="certifications"
                    value={formData.certifications.join(', ')}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      certifications: e.target.value.split(',').map(cert => cert.trim()).filter(cert => cert)
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="AWS Certified Solutions Architect, Google Cloud Professional, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Mentorship Details */}
          {currentStep === 4 && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Mentorship Details</h2>
                <p className="text-gray-600">Tell us about your mentoring approach</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.availability ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your availability</option>
                      <option value="1-5">1-5 hours/week</option>
                      <option value="5-10">5-10 hours/week</option>
                      <option value="10-15">10-15 hours/week</option>
                      <option value="15+">15+ hours/week</option>
                    </select>
                    {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="50"
                        min="0"
                      />
                    </div>
                    {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Mentees</label>
                    <select
                      name="maxMentees"
                      value={formData.maxMentees}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select maximum mentees</option>
                      <option value="1-2">1-2 mentees</option>
                      <option value="3-5">3-5 mentees</option>
                      <option value="6-10">6-10 mentees</option>
                      <option value="10+">10+ mentees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.bio ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={5}
                    placeholder="Tell us about your background, experience, and what makes you a great mentor..."
                  />
                  {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to become a mentor? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.motivation ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={5}
                    placeholder="Share your motivation for becoming a mentor and how you plan to help others..."
                  />
                  {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Success Stories (Optional)</label>
                  <textarea
                    name="successStories"
                    value={formData.successStories}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={5}
                    placeholder="Share any success stories from your career or previous mentoring experiences..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Terms & Conditions */}
          {currentStep === 5 && (
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
                <p className="text-gray-600">Please review your information and accept our terms</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mentor Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Minimum 2 years of professional experience in your field</li>
                    <li>Strong communication and teaching skills</li>
                    <li>Commitment to helping others grow and succeed</li>
                    <li>Availability for regular mentoring sessions</li>
                    <li>Professional conduct and ethical behavior</li>
                    <li>Up-to-date knowledge in your area of expertise</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Code of Conduct</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Treat all mentees with respect and professionalism</li>
                    <li>Maintain confidentiality of mentee information</li>
                    <li>Provide honest, constructive feedback</li>
                    <li>Respect mentee boundaries and time commitments</li>
                    <li>Report any inappropriate behavior or concerns</li>
                    <li>Follow platform guidelines and policies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Policies</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Platform takes a 15% commission on all paid sessions</li>
                    <li>Payment processing fees may apply</li>
                    <li>Mentors are responsible for their own tax obligations</li>
                    <li>Platform reserves the right to review and approve mentor applications</li>
                    <li>Mentors can be removed for violations of platform policies</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">I agree to the Terms and Conditions <span className="text-red-500">*</span></span>
                    {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">I agree to the Privacy Policy <span className="text-red-500">*</span></span>
                    {errors.agreeToPrivacy && <p className="text-red-500 text-sm mt-1">{errors.agreeToPrivacy}</p>}
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToCodeOfConduct"
                    checked={formData.agreeToCodeOfConduct}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">I agree to follow the Code of Conduct <span className="text-red-500">*</span></span>
                    {errors.agreeToCodeOfConduct && <p className="text-red-500 text-sm mt-1">{errors.agreeToCodeOfConduct}</p>}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 border rounded-lg font-medium ${
                currentStep === 1 
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-sm"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeMentor;