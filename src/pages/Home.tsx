import React from 'react';
import { Link } from 'react-router-dom';
import businessImage from '../assets/business.jpg';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex flex-col">
      
      {/* Navigation Bar */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">Mentorship Hub</h1>
        <nav className="space-x-4">
          <Link
            to="/logout"
            className="text-sm text-gray-700 hover:text-indigo-700 font-medium"
          >
            Logout
          </Link>
          <Link
            to="/profile"
            className="text-sm text-gray-700 hover:text-indigo-700 font-medium"
          >
            Profile
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
            Welcome to Mentorship Hub
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Connecting ambition with experience to build meaningful mentorship journeys.
          </p>
        </div>

        {/* Background Image Banner */}
        <div
          className="relative w-full max-w-5xl h-72 md:h-96 rounded-xl overflow-hidden shadow-lg"
          style={{
            backgroundImage: `url(${businessImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Empower Your Career
            </h3>
            <p className="mt-3 text-sm md:text-base text-gray-200 max-w-md">
              Join our mentorship program and take the next step in your
              professional journey.
            </p>
            <Link
              to="/get-started"
              className="mt-5 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-medium transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
