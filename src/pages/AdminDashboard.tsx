import React, { useState } from 'react';
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

const AdminDashboard: React.FC = () => {
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

  const [mentors, setMentors] = useState<any[]>([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);
  const [mentorsError, setMentorsError] = useState('');

  React.useEffect(() => {
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

  const handleMentorInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setMentorForm({ ...mentorForm, [e.target.name]: e.target.value });
  };

  const handleCreateMentor = async (e: React.FormEvent) => {
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
      } else {
        setFormError('Failed to create mentor.');
      }
    } catch (error: any) {
      setFormError(error.response?.data?.message || 'Failed to create mentor.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteMentor = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this mentor?')) return;
    setMentorsLoading(true);
    setMentorsError('');
    try {
      await axios.delete(`${backendUrl}/api/deleteMentor/${id}`);
      setMentors(prev => prev.filter(mentor => mentor.id !== id && mentor._id !== id));
    } catch (err: any) {
      setMentorsError(err.response?.data?.message || 'Failed to delete mentor.');
    } finally {
      setMentorsLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-indigo-600 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Access Required</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Admin Console</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
                activeSection === section.key 
                  ? 'bg-white/10 shadow-md' 
                  : 'hover:bg-white/5'
              }`}
            >
              <span className="mr-3 text-lg">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>
        
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="mt-auto flex items-center justify-center bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {sections.find(s => s.key === activeSection)?.label}
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-700 font-medium">{user.name?.charAt(0) || 'A'}</span>
              </div>
              <span className="text-gray-700">{user.name || 'Admin'}</span>
            </div>
          </div>

          {/* Content Sections */}
          {activeSection === 'createMentor' && (
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Add New Mentor</h3>
                <p className="text-gray-500 text-sm">Fill in the details to create a new mentor profile</p>
              </div>
              <div className="p-6">
                <form onSubmit={handleCreateMentor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={mentorForm.name} 
                      onChange={handleMentorInput} 
                      className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={mentorForm.email} 
                      onChange={handleMentorInput} 
                      className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select 
                      name="availability" 
                      value={mentorForm.availability} 
                      onChange={handleMentorInput} 
                      className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" 
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="NOT-AVAILABLE">Not Available</option>
                      <option value="AVAILABLE">Available</option>
                      <option value="PENDING">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expertise Topic</label>
                    <input 
                      type="text" 
                      name="topic" 
                      value={mentorForm.topic} 
                      onChange={handleMentorInput} 
                      className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={mentorForm.password} 
                      onChange={handleMentorInput} 
                      className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input 
                      type="text" 
                      name="experience" 
                      value={mentorForm.experience} 
                      onChange={handleMentorInput} 
                      className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea 
                      name="bio" 
                      value={mentorForm.bio} 
                      onChange={handleMentorInput} 
                      className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" 
                      rows={4} 
                      required 
                    />
                  </div>
                  
                  {formError && (
                    <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
                      {formError}
                    </div>
                  )}
                  {formSuccess && (
                    <div className="md:col-span-2 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg">
                      {formSuccess}
                    </div>
                  )}
                  
                  <div className="md:col-span-2">
                    <button 
                      type="submit" 
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors shadow-md flex items-center justify-center" 
                      disabled={formLoading}
                    >
                      {formLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Mentor...
                        </>
                      ) : (
                        'Create Mentor Profile'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {activeSection === 'assignRoles' && (
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Role Management</h3>
                <p className="text-gray-500 text-sm">Assign and manage user roles and permissions</p>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <div className="text-indigo-400 text-5xl mb-4">🛠️</div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Role Assignment Coming Soon</h4>
                  <p className="text-gray-500">We're working on this feature for the next release</p>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'bookSessions' && (
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Session Booking</h3>
                <p className="text-gray-500 text-sm">Schedule and manage mentoring sessions</p>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <div className="text-indigo-400 text-5xl mb-4">📅</div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Session Management Coming Soon</h4>
                  <p className="text-gray-500">This feature is currently in development</p>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'viewMentors' && (
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Mentor Directory</h3>
                  <p className="text-gray-500 text-sm">View and manage all mentor profiles</p>
                </div>
                <button 
                  onClick={fetchMentors}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
                  disabled={mentorsLoading}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
              <div className="p-6">
                {mentorsLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : mentorsError ? (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    {mentorsError}
                  </div>
                ) : mentors.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-5xl mb-4">👥</div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">No Mentors Found</h4>
                    <p className="text-gray-500">Create your first mentor using the "Create Mentor" section</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mentors.map((mentor, idx) => (
                          <tr key={mentor.id || mentor._id || idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <span className="text-indigo-600 font-medium">{mentor.name?.charAt(0) || 'M'}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{mentor.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mentor.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                mentor.availability === 'AVAILABLE' 
                                  ? 'bg-green-100 text-green-800' 
                                  : mentor.availability === 'PENDING' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-red-100 text-red-800'
                              }`}>
                                {mentor.availability === 'AVAILABLE' ? 'Available' : mentor.availability === 'PENDING' ? 'Pending' : 'Unavailable'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mentor.topic}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mentor.experience} years</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDeleteMentor(mentor.id || mentor._id)}
                                className="text-red-600 hover:text-red-900 disabled:text-red-300"
                                disabled={mentorsLoading}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;