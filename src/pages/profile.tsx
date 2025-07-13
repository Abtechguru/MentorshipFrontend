import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

interface UserProfile {
  personalInfo: {
    name: string;
    email: string;
    avatar?: string;
    location?: string;
    experience?: string;
  };
  about: {
    bio: string;
    interests: string[];
  };
  professional: {
    skills: string[];
    goals: string[];
  };
}

function profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
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
  })

  const [inputState, setInputState] = useState({
    skill: '',
    goal: '',
    interest: ''
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputState(prev => ({ ...prev, [name]: value }))
  }

  const addItem = (category: keyof typeof inputState, arrayKey: 'about' | 'professional') => {
    const value = inputState[category].trim()
    if (value) {
      if (arrayKey === 'about' && category === 'interest') {
        if (!profile.about.interests.includes(value)) {
          setProfile(prev => ({
            ...prev,
            about: {
              ...prev.about,
              interests: [...prev.about.interests, value]
            }
          }))
          setInputState(prev => ({ ...prev, interest: '' }))
        }
      } else if (arrayKey === 'professional') {
        if (category === 'skill' && !profile.professional.skills.includes(value)) {
          setProfile(prev => ({
            ...prev,
            professional: {
              ...prev.professional,
              skills: [...prev.professional.skills, value]
            }
          }))
          setInputState(prev => ({ ...prev, skill: '' }))
        } else if (category === 'goal' && !profile.professional.goals.includes(value)) {
          setProfile(prev => ({
            ...prev,
            professional: {
              ...prev.professional,
              goals: [...prev.professional.goals, value]
            }
          }))
          setInputState(prev => ({ ...prev, goal: '' }))
        }
      }
    }
  }

  const removeItem = (arrayKey: 'about' | 'professional', item: string) => {
    if (arrayKey === 'about') {
      setProfile(prev => ({
        ...prev,
        about: {
          ...prev.about,
          interests: prev.about.interests.filter(i => i !== item)
        }
      }))
    } else {
      if (profile.professional.skills.includes(item)) {
        setProfile(prev => ({
          ...prev,
          professional: {
            ...prev.professional,
            skills: prev.professional.skills.filter(i => i !== item)
          }
        }))
      } else {
        setProfile(prev => ({
          ...prev,
          professional: {
            ...prev.professional,
            goals: prev.professional.goals.filter(i => i !== item)
          }
        }))
      }
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Authentication Required
          </h2>
          <p className="text-gray-600">
            Please sign in to access your personalized profile dashboard.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            My Professional Profile
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                editMode 
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                  {profile.personalInfo.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-center text-gray-800">
                  {profile.personalInfo.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {profile.personalInfo.email}
                </p>

                {profile.personalInfo.location && (
                  <div className="mt-4 flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {profile.personalInfo.location}
                  </div>
                )}

                {profile.personalInfo.experience && (
                  <div className="mt-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {profile.personalInfo.experience}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Profile Content */}
          <section className="lg:col-span-3 space-y-6">
            {/* About Section */}
            <article className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-cyan-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Professional Summary
                  </h3>
                </div>
                {editMode ? (
                  <textarea
                    value={profile.about.bio}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      about: { ...prev.about, bio: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows={5}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {profile.about.bio}
                  </p>
                )}
              </div>
            </article>

            {/* Skills Section */}
            <article className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Technical Proficiencies
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.professional.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      {skill}
                      {editMode && (
                        <button
                          onClick={() => removeItem('professional', skill)}
                          className="ml-1.5 text-emerald-600 hover:text-emerald-900"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {editMode && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="skill"
                      value={inputState.skill}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && addItem('skill', 'professional')}
                      placeholder="Add technical skill..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => addItem('skill', 'professional')}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </article>

            {/* Goals Section */}
            <article className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-violet-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Career Objectives
                  </h3>
                </div>
                <ul className="space-y-3 mb-4">
                  {profile.professional.goals.map((goal, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-violet-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 flex-1">{goal}</span>
                      {editMode && (
                        <button
                          onClick={() => removeItem('professional', goal)}
                          className="text-violet-600 hover:text-violet-900 ml-2"
                        >
                          ×
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {editMode && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="goal"
                      value={inputState.goal}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && addItem('goal', 'professional')}
                      placeholder="Add career goal..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => addItem('goal', 'professional')}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </article>

            {/* Interests Section */}
            <article className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Personal Interests
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.about.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      {interest}
                      {editMode && (
                        <button
                          onClick={() => removeItem('about', interest)}
                          className="ml-1.5 text-amber-600 hover:text-amber-900"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {editMode && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="interest"
                      value={inputState.interest}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && addItem('interest', 'about')}
                      placeholder="Add personal interest..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => addItem('interest', 'about')}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  )
}

export default profile;