"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Carousel from "../../components/Carousel";
import { setLogLevel } from "firebase/app";
import Bar from "@/components/Bar";


const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("...");
  const [exp, setExp] = useState();
  const [level, setLevel] = useState();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) setUser(session.user);
        else setUser(null);
      },
    );
    
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
      // Fetch the user's ID
      const { data: usrId, error: usrError } = await supabase
        .from("user")
        .select("id, name, level, exp")
        .eq("email", user.email);

      if (usrError) {
        console.error("Error fetching user ID:", usrError);
        return;
      }
      
      setUsername(usrId[0].name);
      setLevel(usrId[0].level);
      setExp(usrId[0].exp);


      // Fetch the tasks for the current user
      const { data: userTasks, error: taskError } = await supabase
        .from("task")
        .select("id, card_id, status")
        .eq("user_id", usrId[0].id);

      if (taskError) {
        console.error("Error fetching tasks:", taskError);
        return;
      }

      // Fetch the card details for each task
      const taskWithCardTitles = await Promise.all(
        userTasks.map(async (task) => {
          const { data: card, error: cardError } = await supabase
            .from("card")
            .select("*")
            .eq("id", task.card_id)
            .single();

          if (cardError) {
            console.error("Error fetching card title:", cardError);
            return null;
          }

          return {
            ...task,
            cardTitle: card.title,
            id: task.id,
            difficulty: card.difficulty,
          };
        }),
      );

      setTasks(taskWithCardTitles.filter(Boolean));
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth/login");
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">Please log in.</p>;

  

  // Bottom Menu Items
  const menuItems = ["Home", "Tasks", "Leaderboard", "Graph", "Profile"];

  return (
    <div className="flex flex-col bg-[#f8f5f2] text-black font-poppins overflow-hidden">
      {/* Header */}
      <div className="pt-10 text-center">
        <h1 className="text-4xl font-bold tracking-wide">
          Hello, {username}
        </h1>
      </div>
      <div className="flex flex-row content-center justify-center mr-16">
						<Bar level={level} exp={exp} />
					</div>
          <div className="h-8 w-128 text-center">
					<h1>{`Level ${level} (exp: ${exp})`}</h1>
			
				</div>

      {/* Tasks Dashboard */}
      <div>
        <div>
          {tasks.length > 0 ? (
            <Carousel tasks={tasks} level={level} exp={exp} />
          ) : (
            <p className="text-center text-lg">No tasks available.</p>
          )}
        </div>
      </div>

      {/* Popup for Tasks */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={togglePopup}
        >
          <div
            className="bg-white border-4 border-black rounded-[14px] shadow-[8px_8px_0_0_#000] p-8 w-80 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-5">Social Friendly Tasks</h2>
            <ul className="list-none p-0">
              {tasks.map((task, index) => (
                <li key={index} className="mb-4 text-lg font-medium">
                  {task.cardTitle}
                </li>
              ))}
            </ul>
            <button
              className="absolute top-3 right-3 bg-red-500 text-white border-2 border-black rounded-full px-3 py-1 font-semibold shadow-[4px_4px_0_0_#000] transition-all duration-300 hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"
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
          className="px-6 py-3 mb-10 bg-red-500 text-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] transition-all duration-300 hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"
        >
          Log Out
        </button>
      </div>

      {/* Bottom Menu */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t-4 border-black flex justify-evenly items-center py-4 shadow-[4px_-4px_0_0_#000]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedMenu(index)}
            className={`cursor-pointer w-20 text-center text-sm font-bold transition-all duration-300 ${
              selectedMenu === index
                ? "text-yellow-400 scale-110"
                : "text-black hover:scale-110"
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
