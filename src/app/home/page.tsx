"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Carousel from "../../components/Carousel";
import { setLogLevel } from "firebase/app";
import Bar from "@/components/Bar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { u } from "framer-motion/client";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("...");
  const [exp, setExp] = useState();
  const [level, setLevel] = useState();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
        .eq("status", "assigned")
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

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">Please log in.</p>;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col bg-[#f8f5f2] text-black font-poppins min-h-screen pb-20">
      {/* Header */}
      <div className="pt-10 text-center">
        <h1 className="text-4xl font-bold tracking-wide mb-4">
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
        {tasks.length > 0 ? (
          <Carousel tasks={tasks} level={level} exp={exp} />
        ) : (
          <p className="text-center text-lg">No tasks available.</p>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={handleSignOut}
          className="mt-4 mb-2 px-4 py-2 text-sm bg-red-500 text-white border-2 border-black 
          rounded-lg shadow-[3px_3px_0_0_#000] transition-all duration-300 
          hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
