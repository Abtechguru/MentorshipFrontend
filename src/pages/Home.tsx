import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          Welcome to Mentorship Hub
        </h1>
        <p className="text-lg text-gray-700 md:text-xl mb-6">
          Connect. Learn. Grow. <br className="hidden md:inline" /> Your journey to greatness starts here.
        </p>
        <a
          href="/login"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default Home;
