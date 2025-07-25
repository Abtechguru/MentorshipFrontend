import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import mentor from "../assets/business.jpg"

function Home() {
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      {/* Navigation Header */}
      <div className='bg-indigo-800 shadow-xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <h1 className='text-white font-bold text-2xl tracking-wide'>
              ABTECH BEACON
            </h1>
            <div className='flex space-x-4'>
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={handleLogout}
                    className='text-gray-300 hover:text-amber-300 transition-colors duration-200'
                  >
                    Sign Out
                  </button>
                  <Link 
                    to="/profile" 
                    className='bg-gray-800 text-amber-500 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium'
                  >
                    My Profile
                  </Link>
                </>
              ) : (
                <><Link
                    to="/login"
                    className='bg-gray-800 text-amber-500 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium'
                  >
                    Member Login
                  </Link><Link
                    to="/adminLogin"
                    className='bg-gray-800 text-amber-500 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium'
                  >
                      Administrator Portal
                    </Link></>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className='relative min-h-screen flex items-center justify-center'>
        {/* Background Image */}
        <img
          src={mentor}
          alt="Professional Mentorship"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/80 to-black/50'></div>
        
        {/* Hero Content */}
        <div className='relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'>
            Elevate Your 
            <span className='text-amber-400'> Professional Journey</span>
          </h1>
          
          <p className='text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed'>
            Connect with seasoned industry leaders who provide strategic guidance for career advancement. 
            Accelerate your professional development through personalized mentorship relationships.
          </p>
          
          {/* Call to Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link 
              to="/mentors"
              className='bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg'
            >
              Discover Mentors
            </Link>
            
            <Link 
              to="/become-mentor"
              className='bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105'
            >
              Join as Mentor
            </Link>
          </div>
          
          {/* Performance Metrics */}
          <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='text-4xl font-bold text-amber-400 mb-2'>500+</div>
              <div className='text-gray-300'>Industry Experts</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-amber-400 mb-2'>2000+</div>
              <div className='text-gray-300'>Strategic Partnerships</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-amber-400 mb-2'>95%</div>
              <div className='text-gray-300'>Career Progression Rate</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-white rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-white rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className='bg-gray-50 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Our Strategic Advantages
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Designed for professionals seeking accelerated growth and measurable career outcomes
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Executive-Level Guidance</h3>
              <p className='text-gray-600'>
                Access C-suite professionals and industry pioneers with proven leadership experience
              </p>
            </div>
            
            <div className='text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Personalized Engagement</h3>
              <p className='text-gray-600'>
                Customized session planning aligned with your professional objectives
              </p>
            </div>
            
            <div className='text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Performance Tracking</h3>
              <p className='text-gray-600'>
                Milestone-based progress measurement with quantifiable career outcomes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-amber-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-indigo-500 rounded-lg flex items-center justify-center mr-4 animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent">
                    ABTECH BEACON
                  </h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                  Premier platform for strategic professional development through executive mentorship. 
                  Empowering career transitions and leadership development since 2023.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-amber-400">Platform Navigation</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Mentor Directory', href: '/mentors', icon: '🔍' },
                    { name: 'Mentor Application', href: '/become-mentor', icon: '📝' },
                    { name: 'Success Metrics', href: '/metrics', icon: '📊' },
                    { name: 'Learning Resources', href: '/resources', icon: '🎓' },
                    { name: 'Enterprise Solutions', href: '/enterprise', icon: '🏢' }
                  ].map((link, index) => (
                    <li key={index} className="group">
                      <Link 
                        to={link.href}
                        className="flex items-center text-gray-300 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2"
                      >
                        <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{link.icon}</span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-amber-400">Corporate Headquarters</h4>
                <div className="space-y-4">
                  <div className="flex items-center group">
                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-500 transition-colors duration-300">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      partnership@abtechbeacon.com
                    </span>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-500 transition-colors duration-300">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      +2347041514615
                    </span>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-500 transition-colors duration-300">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      Lagos Nigeria
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4 text-amber-400">Strategic Insights Newsletter</h4>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Receive industry analysis, leadership strategies, and platform enhancements
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Corporate email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                  <button className="bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2025 ABTECH BEACON. All intellectual property rights reserved.
                </div>
                <div className="flex space-x-6 text-sm">
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Confidentiality Agreement</a>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Service Terms</a>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Compliance</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </footer>
    </>
  )
}

export default Home;