"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getFlattenedIds } from "../graph/fetchData";
import Footer from "@/components/Footer";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("...");
  const [points, setPoints] = useState(0);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [socialMedia, setSocialMedia] = useState("");
  const [userID, setUserID] = useState("");
  const [success, showSuccess] = useState(false);
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
          router.push("/auth/login"); // Redirect to login if not logged in
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchLeaderboard();
      fetchCompletedTasks();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      // Fetch the user's ID and name
      const { data: usrData, error: usrError } = await supabase
        .from("user")
        .select("id, name, exp, social_media")
        .eq("email", user.email)
        .single();

      if (usrError || !usrData) {
        console.error("Error fetching user profile:", usrError);
        return;
      }

      setUsername(usrData.name);
      setUserID(usrData.id);
      setSocialMedia(usrData.social_media);

      setPoints(usrData.exp);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const fetchLeaderboard = async () => {
    // make a list of everyone you are connected with via userId's
    let connectedUsers = await getFlattenedIds(user.email); // replace with actual connected users' IDs
    console.log(user.email);

    try {
      // Fetch the exp of all connected users
      const { data, error } = await supabase
        .from("user")
        .select("id, name, exp")
        .in("id", connectedUsers);

      if (error) {
        console.error("Error fetching leaderboard data:", error);
        return;
      }

      // Sort users by their exp in descending order
      const sortedUsers = data
        .sort((a, b) => b.exp - a.exp) // descending order by exp
        .map((user, index) => ({
          rank: index + 1,
          id: user.id,
          name: user.name,
          points: user.exp,
        }));

      setLeaderboard(sortedUsers);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const { data: usrData, error: usrError } = await supabase
        .from("user")
        .select("id, name, exp")
        .eq("email", user.email)
        .single();

      if (!usrData) {
        return;
      }

      const { data, error } = await supabase
        .from("task")
        .select("id, card_id, completed_at")
        .eq("user_id", usrData.id)
        .eq("status", "completed")
        .order("completed_at", { ascending: false }); // Sort by completion date


        
      if (error) {
        console.error("Error fetching completed tasks:", error);
        return;
      }
    

      // For each task, fetch the corresponding card details (like title)
      const tasksWithTitles = await Promise.all(
        data.map(async (task) => {
          // Fetch card details using card_id
          const { data: cardData, error: cardError } = await supabase
            .from("card")
            .select("title")
            .eq("id", task.card_id)
            .single();

          if (cardError || !cardData) {
            console.error("Error fetching card details:", cardError);
            return null;
          }

          return { ...task, title: cardData.title }; // Merge card title with task data
        }),
      );

      // Filter out any tasks that failed to fetch card data
      setCompletedTasks(tasksWithTitles.filter((task) => task !== null));

      //   const { data, error } = await supabase
      //     .from("task")
      //     .select("id, completed_at")
      //     .eq("user_id", user.id)
      //     .is("completed_at", true)
      //     .order("completed_at", { ascending: false }); // Sort by completion date

      //   if (error) {
      //     console.error("Error fetching completed tasks:", error);
      //     return;
      //   }

      //   setCompletedTasks(data);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth/login");
  };


  const handleSocialMedia = async () => {
    const { error: updateError } = await supabase
    .from('user')
    .update({
      social_media: socialMedia
    })
    .eq('id', userID);

    if (!updateError) {
      showSuccess(true);
      setTimeout(() => {
        showSuccess(false);
      }, 3000);
    }

  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen mx-auto px-6 py-4 bg-[#f8f5f2] 
text-black font-poppins overflow-hidden">
      {/* Header */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold tracking-wide">Profile</h1>
      </div>



      {/* Profile Info */}
      <div className="mx-auto w-full max-w-3xl p-8 bg-white border-4 border-black rounded-[14px] shadow-[8px_8px_0_0_#000]">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {username}
        </h2>

        <div className="text-lg text-center">
          <p className="font-semibold">Total Points Earned:</p>
          <p className="text-2xl font-bold">{points} points</p>
        </div>

        <div className = "mt-4 gap-2 mb-4 flex flex-row w-full justify-center content-center">
      <input value={socialMedia} onChange={(event) => setSocialMedia(event.target.value)} className = "p-2" placeholder="Social Media Link" type = "text"/>
      <button onClick={handleSocialMedia} className="px-4 py-2 text-sm bg-red-500 text-white border-2 border-black 
          rounded-lg shadow-[3px_3px_0_0_#000] transition-all duration-300 
          hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"
        >Save</button>
  </div>
  <p className={`text-center text-green-600 ${success ? "" : "hidden"}`}>Successfully Saved Social Media Link</p>

        {/* Leaderboard */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4">
            Local Leaderboard
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-2">Rank</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                    <tr
                        key={user.id}
                        className={`border-b border-gray-300 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        }`}
                    >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.points}</td>
                    </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        {/* Completed Tasks - Sliding Row */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4">
            Completed Tasks
          </h3>
          <div className="overflow-x-auto flex space-x-4 pb-4">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="min-w-[200px] p-4 bg-blue-100 rounded-lg shadow-lg"
                >
                  <h4 className="text-lg font-bold">{task.title}</h4>
                  <p className="text-sm text-gray-600">
                    Completed on:{" "}
                    {new Date(task.completed_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No completed tasks yet.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
