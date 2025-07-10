import { useState, useEffect } from 'react'
import axios from 'axios'
import { useShopContext } from '../context'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

interface Mentor {
  id: string;
  name: string;
  title: string;
  email: string;
  bio: string;
  expertise: string[];
  yearsInField: string;
  location?: string;
  sessionFee?: number;
  satisfactionScore?: number;
  availability?: string;
  profileImage?: string;
  focusArea?: string;
  mentorshipStyle?: string;
}

function MentorDiscovery() {
  const context = useShopContext()
  const backendUrl = context?.backendUrl || ""
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  
  // Discovery filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [seniorityFilter, setSeniorityFilter] = useState('')
  const [sortPreference, setSortPreference] = useState('recommended')
  const [availabilityFilter, setAvailabilityFilter] = useState(false)

  // Available expertise areas
  const expertiseOptions = [
    'Frontend Architecture', 'Cloud Solutions', 'Data Engineering', 
    'Technical Leadership', 'Career Growth', 'Interview Coaching',
    'Startup Strategy', 'DevOps Practices', 'Product Development',
    'UX Research', 'Technical Writing', 'Open Source Contribution'
  ]

  useEffect(() => {
    fetchMentorProfiles()
  }, [])

  useEffect(() => {
    applyDiscoveryFilters()
  }, [mentors, searchQuery, selectedExpertise, seniorityFilter, sortPreference, availabilityFilter])

  const fetchMentorProfiles = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${backendUrl}/api/mentors`)
      
      if (Array.isArray(response.data?.profiles)) {
        setMentors(response.data.profiles)
      } else {
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
        ])
      }
    } catch (error) {
      console.error('Error fetching mentors:', error)
      setErrorMessage('We encountered an issue loading mentor profiles. Our team has been notified.')
    } finally {
      setIsLoading(false)
    }
  }

  const applyDiscoveryFilters = () => {
    let results = [...mentors]

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(mentor =>
        mentor.name.toLowerCase().includes(query) ||
        mentor.bio.toLowerCase().includes(query) ||
        (mentor.expertise && mentor.expertise.some(area => area.toLowerCase().includes(query)))
      )
    }

    // Expertise filter
    if (selectedExpertise.length > 0) {
      results = results.filter(mentor =>
        mentor.expertise && mentor.expertise.some(area => selectedExpertise.includes(area))
      )
    }

    // Seniority filter
    if (seniorityFilter) {
      results = results.filter(mentor => 
        parseInt(mentor.yearsInField) >= parseInt(seniorityFilter)
      )
    }

    // Availability filter
    if (availabilityFilter) {
      results = results.filter(mentor => 
        mentor.availability === 'Available' || mentor.availability === 'Flexible'
      )
    }

    // Sorting
    results.sort((a, b) => {
      switch (sortPreference) {
        case 'experience':
          return parseInt(b.yearsInField) - parseInt(a.yearsInField)
        case 'satisfaction':
          return (b.satisfactionScore || 0) - (a.satisfactionScore || 0)
        case 'fee':
          return (a.sessionFee || 0) - (b.sessionFee || 0)
        default: // recommended
          return (b.satisfactionScore || 0) * 0.7 + (parseInt(b.yearsInField) * 0.3) - 
                 ((a.satisfactionScore || 0) * 0.7 + (parseInt(a.yearsInField) * 0.3))
      }
    })

    setFilteredMentors(results)
  }

  const toggleExpertiseSelection = (expertise: string) => {
    setSelectedExpertise(prev =>
      prev.includes(expertise)
        ? prev.filter(e => e !== expertise)
        : [...prev, expertise]
    )
  }

  const resetDiscoveryFilters = () => {
    setSearchQuery('')
    setSelectedExpertise([])
    setSeniorityFilter('')
    setSortPreference('recommended')
    setAvailabilityFilter(false)
  }

  const viewMentorProfile = (mentorId: string) => {
    navigate(`/mentors/${mentorId}`)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-indigo-600 text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Learning Community</h2>
          <p className="text-gray-600 mb-6">Sign in to connect with industry experts and accelerate your growth</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Discovering exceptional mentors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Discovery Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Professional Guide</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with seasoned experts who can help you navigate your career journey
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Discovery Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Mentors</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, expertise, or keywords..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Seniority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Experience</label>
              <select
                value={seniorityFilter}
                onChange={(e) => setSeniorityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Any experience</option>
                <option value="3">3+ years</option>
                <option value="5">5+ years</option>
                <option value="8">8+ years</option>
                <option value="10">10+ years</option>
              </select>
            </div>

            {/* Availability */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                />
                <span className="text-sm text-gray-700">Currently available</span>
              </label>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortPreference}
                onChange={(e) => setSortPreference(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="recommended">Recommended</option>
                <option value="experience">Most experienced</option>
                <option value="satisfaction">Highest rated</option>
                <option value="fee">Lowest fee</option>
              </select>
            </div>
          </div>

          {/* Expertise Filter */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Areas of Expertise</label>
            <div className="flex flex-wrap gap-2">
              {expertiseOptions.map(expertise => (
                <button
                  key={expertise}
                  onClick={() => toggleExpertiseSelection(expertise)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedExpertise.includes(expertise)
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {expertise}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedExpertise.length > 0 || seniorityFilter || availabilityFilter) && (
            <div className="mt-4 flex items-center flex-wrap gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {selectedExpertise.map(expertise => (
                <span
                  key={expertise}
                  className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs flex items-center"
                >
                  {expertise}
                  <button 
                    onClick={() => toggleExpertiseSelection(expertise)}
                    className="ml-1 text-indigo-500 hover:text-indigo-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
              {seniorityFilter && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center">
                  {seniorityFilter}+ years
                  <button 
                    onClick={() => setSeniorityFilter('')}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    &times;
                  </button>
                </span>
              )}
              {availabilityFilter && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
                  Available
                  <button 
                    onClick={() => setAvailabilityFilter(false)}
                    className="ml-1 text-green-500 hover:text-green-700"
                  >
                    &times;
                  </button>
                </span>
              )}
              <button
                onClick={resetDiscoveryFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800 ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredMentors.length} professional {filteredMentors.length === 1 ? 'mentor' : 'mentors'} matching your criteria
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredMentors.length} of {mentors.length} available guides
          </div>
        </div>

        {/* Error State */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Mentors Grid */}
        {filteredMentors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors match your current filters</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search criteria or explore our full mentor directory
            </p>
            <button
              onClick={resetDiscoveryFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map(mentor => (
              <div
                key={mentor.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Mentor Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl font-bold">
                        {mentor.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{mentor.name}</h3>
                      <p className="text-blue-100">{mentor.title}</p>
                    </div>
                  </div>
                </div>

                {/* Mentor Details */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {mentor.location || 'Remote'}
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {mentor.bio}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Specializes in</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Experience</p>
                      <p className="font-medium">{mentor.yearsInField} years</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Session Fee</p>
                      <p className="font-medium">${mentor.sessionFee}/hr</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rating</p>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{mentor.satisfactionScore?.toFixed(1)}</span>
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500">Style</p>
                      <p className="font-medium truncate" title={mentor.mentorshipStyle}>
                        {mentor.mentorshipStyle?.split(' ')[0]}...
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => viewMentorProfile(mentor.id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MentorDiscovery