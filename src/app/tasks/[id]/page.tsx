'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const TaskPage = () => {
  const { id } = useParams();  // Capture the dynamic task ID from the URL

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-poppins">
      <div className="py-10 text-center">
        <h1 className="text-4xl font-semibold tracking-wide">Hello, Task {id}!</h1>
      </div>

      {/* Content for the Task */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <p className="text-lg font-medium">This is your task page. Task ID: {id}</p>
      </div>

      {/* Bottom Menu (same as Home) */}
      <div className="sticky bottom-0 left-0 right-0 bg-gray-900 flex justify-evenly items-center py-3 border-t-2 border-gray-700 shadow-md">
        {["Home", "Tasks", "Leaderboard", "Clans", "Profile"].map((item, index) => (
          <div
            key={index}
            className="text-center cursor-pointer w-16 text-sm font-medium transform transition-all duration-300 hover:scale-110"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
