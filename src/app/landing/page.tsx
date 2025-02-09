import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-5xl font-bold mb-4">SocialChain</h1>
      <p className="text-lg text-gray-300 max-w-2xl text-center">
        Join your community, complete daily challenges, verify them, and pass
        them forward. Gain reputation, climb the leaderboard, and grow your
        chain!
      </p>
      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg">
          Sign Up
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg">
          Learn More
        </button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Sign Up</h2>
          <p className="text-gray-400">
            Join your city or community, connect your social profiles, and start
            playing.
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Complete Challenges</h2>
          <p className="text-gray-400">
            Get skill-based tasks, verify with proof, and keep your chain going.
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Track Progress</h2>
          <p className="text-gray-400">
            See your challenge graph, explore the global chain, and climb the
            leaderboard.
          </p>
        </div>
      </div>
      <footer className="mt-12 text-gray-500">&copy; 2025 SocialChain.</footer>
    </div>
  );
}
