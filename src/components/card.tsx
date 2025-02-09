"use client"

import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import QRCode from "react-qr-code";
import { supabase } from "@/lib/supabase";






export default function Card(props: any) {

  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log(session)
        if (session) {
          const { data: usrId, error: usrError } = await supabase
                  .from("user")
                  .select("id")
                  .eq("email", session.user.email)
                  .single();
                  if (usrId !== null) {
                    setUserID(usrId.id);
                  }
         
        } else {
          setUserID('');
        }

      } catch (error) {
      }
    };
    fetchSession();
  });


  async function handleForfeit(event: any, taskID: any, points: any) {
    await supabase
      .from("task")
      .delete()
      .eq("id", taskID);



    const { data: newCards, error } = await supabase
      .from("card")
      .select("*")
      .lte('difficulty', points)
    if (!error && newCards !== null) {
      const randomCard = newCards[Math.floor(Math.random() * (newCards.length))];
      const { error: createTaskError } = await supabase
        .from('task')
        .insert([{
          user_id: userID, // Assign the new task to the user
          card_id: randomCard.id, // Assign the random card
          status: 'assigned', // The task is assigned
        }]);


      if (createTaskError) {
        return;
      }

      window.location.href = "/home";
    }


  }



  return (

    <div className="flex w-full h-full flex-col content-center gap-2 pt-6 pb-6 text-center items-center justify-center">
        <QRCode className="w-32 h-32" value={`http://localhost:3000${props.src}`} />
        <p className="italic">{props.points} points</p>
        <div className="text-center">
        <button
        onClick={(event) => handleForfeit(event, props.taskID, props.points)}

          className="px-4 py-1 bg-red-800 text-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] transition-all duration-300 hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"
        >
          Forfeit
        </button>
      </div>
    </div>

  )
}
