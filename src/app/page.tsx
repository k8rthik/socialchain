'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { assignRandomTasksToUser } from '@/app/utils/ass';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]); // State to store the tasks
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0); // Default to the first menu item
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) setUser(session.user);
        else setUser(null);
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserTasks();
    }
  }, [user]);

  const fetchUserTasks = async () => {
    try {
      // Get tasks for the current user
      const { data: usrId, error: usrError } = await supabase
        .from('user')
        .select('id')
        .eq('email', user.email);

      if (usrError) {
        console.error('Error fetching user ID:', usrError);
        return;
      }
      const { data: userTasks, error: taskError } = await supabase
        .from('task')
        .select('id, card_id, status')
        .eq('user_id', usrId[0].id);

      if (taskError) {
        console.error('Error fetching tasks:', taskError);
        return;
      }

      // Fetch the titles of the cards associated with these tasks
      const taskWithCardTitles = await Promise.all(
        userTasks.map(async (task) => {
          const { data: card, error: cardError } = await supabase
            .from('card')
            .select('title')
            .eq('id', task.card_id)
            .single(); // We expect only one card, so use .single()

          if (cardError) {
            console.error('Error fetching card title:', cardError);
            return null;
          }

          return {
            ...task,
            cardTitle: card.title,
          };
        })
      );

      // Filter out any tasks that failed to fetch card data
      setTasks(taskWithCardTitles.filter(Boolean));
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear user state
    router.push('/auth/login'); // Redirect to the login page after sign out
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Please log in.</p>;

  // Menu Items
  const menuItems = ['Home', 'Tasks', 'Leaderboard', 'Clans', 'Profile'];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-poppins overflow-hidden">
      <div className="py-10 text-center">
        <h1 className="text-4xl font-semibold tracking-wide">Hello, {user.email}</h1>
      </div>

      {/* Dashboard Button */}
      <div
        className="mt-6 mx-auto px-6 py-4 bg-indigo-500 text-white rounded-full cursor-pointer w-64 text-lg font-medium shadow-md transform transition-all duration-300 hover:scale-105"
        onClick={togglePopup}
      >
        Open Dashboard
      </div>

      {/* Task List (Dashboard) */}
      <div className="mt-8 mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Your Tasks Dashboard</h2>
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className="block px-4 py-3 bg-blue-500 text-white rounded-md shadow-lg transition-all duration-300 hover:bg-blue-400 transform hover:scale-105"
              >
                {/* Display the card's title as the task name */}
                {task.cardTitle}
              </Link>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>

      {/* Popup for tasks */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={togglePopup}
        >
          <div
            className="bg-gray-700 p-8 rounded-lg w-80 shadow-lg relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-5">Social Friendly Tasks</h2>
            <ul className="list-none p-0">
              {tasks.map((task, index) => (
                <li key={index} className="mb-4 text-lg font-medium">{task.cardTitle}</li>
              ))}
            </ul>
            <button
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-3 py-1 font-semibold shadow-md transition-all duration-300 hover:bg-red-400"
              onClick={togglePopup}
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Log Out Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSignOut}
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Log Out
        </button>
      </div>

      {/* Bottom Menu */}
      <div className="sticky bottom-0 left-0 right-0 bg-gray-900 flex justify-evenly items-center py-3 border-t-2 border-gray-700 shadow-md">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedMenu(index)}
            className={`text-center cursor-pointer w-16 text-sm font-medium transform transition-all duration-300 ${
              selectedMenu === index ? 'text-yellow-400 font-bold scale-110' : 'text-gray-400 hover:scale-110'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
