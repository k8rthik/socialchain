"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams from next/navigation
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { data } from "framer-motion/client";

const VerifyTask = () => {
  const searchParams = useSearchParams(); // Access query parameters via useSearchParams
  const router = useRouter();

  // Get the task_id and user_id from the URL search parameters
  const task_id = searchParams.get("task_id");

  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    };

    checkSession();
  }, [router]);

  const verifyTask = async () => {
    if (!task_id) {
      setStatus("Invalid task or user ID");
      return;
    }

    setStatus("Working...");

    try {
      // Fetch the current session to get the verifier's user ID
      const { data: { session } } = await supabase.auth.getSession();
      const verifier_id = session?.user?.id;

      const { data: verifier, error: userError } = await supabase
      .from('user')
      .select('id')
      .eq('email', session?.user.email)
      .single();



      if (!verifier) {
        setStatus("You are not authorized to verify.");
        return;
      }


      // Step 1: Fetch the task from the task table
      const { data: task, error: taskError } = await supabase
        .from('task')
        .select('id, user_id, card_id, status')
        .eq('id', task_id)
        .single();

       
        const user_id = task?.user_id;

      if (taskError || !task) {
        setStatus("Task not found.");
        return;
      }

      // Step 2: Update the task's status to 'completed' and assign verifier_id
      const { error: updateError } = await supabase
        .from('task')
        .update({
          status: 'completed',
          verifier_id: verifier.id, // Assign the verifier's ID
        })
        .eq('id', task_id);

      if (updateError) {
        console.log(updateError);
        setStatus("Error updating task.");
        return;
      }

      const {data: xpData} = await supabase.from("user").select('exp').eq("id", user_id).single();
      if (!xpData) {
        return;
      }

      const { data : cardData } = await supabase.from("card").select('difficulty').eq("id", task.card_id).single();
      if (!cardData) {
        return null;
      }
      await supabase.from("user").update({
        exp: xpData.exp + cardData.difficulty
      }).eq("id", user_id);

      
      const {data: currLevel} = await supabase.from("user").select('level').eq("id", user_id).single();
      if (!currLevel) {
        return;
      }
      console.log(currLevel);
      if (currLevel.level <= (Math.pow(1.5,(xpData.exp + cardData.difficulty)))) {
        await supabase.from("user").update({
          level: currLevel.level + 1
        }).eq("id", user_id);
      }
    



      // Step 3: Fetch one random card from the card pool

      const { data: countData, error: countError } = await supabase
        .from('card')
        .select('id', { count: 'exact' });


if (countError || !countData) {
    setStatus("Error fetching card count.");
    return;
  }
  
  // Get the total count of cards
  const totalCards = countData.length; // Number of cards in the card pool
  
  // Step 2: Generate a random number between 1 and totalCards
  const randomIndex = (Math.floor(Math.random() * totalCards) + 4);

  
  // Step 3: Fetch the card by that random index
  const { data: randomCard, error: randomCardError } = await supabase
    .from('card')
    .select('id')
    .eq('id', randomIndex)
    .single(); // We expect to get only one card

    
    if (randomCardError || !randomCard) {
        setStatus("Error fetching random card.");
        return;
      }
      
      // Step 4: Create a new task for the user with the new card (replacing the completed task)
      const { error: createTaskError } = await supabase
        .from('task')
        .insert([{
          user_id: user_id, // Assign the new task to the user
          card_id: randomCard.id, // Assign the random card
          status: 'assigned', // The task is assigned
        }]);


      if (createTaskError) {
        setStatus("Error creating new task for user.");
        return;
      }

      console.log("AAAA");
      console.log(verifier.id);
      console.log(randomCard.id);
      // Step 5: Optionally, assign the verifier the same task (for verification tracking)

      const { error: createVerifierTaskError } = await supabase
        .from('task')
        .insert([{
          user_id: verifier.id, // Assign the task to the verifier
          card_id: task.card_id, // Same card
          status: 'assigned', // Mark as assigned for verifier
        }]);

      if (createVerifierTaskError) {
        setStatus("Error creating task for verifier.");
        return;
      }

      // Step 6: Return success message
      setStatus("Task verified and new task assigned!");
    } catch (error) {
      console.error("Error during task verification:", error);
      setStatus("An error occurred.");
    }
  };

  useEffect(() => {
    if (task_id) {
      verifyTask();
    }
  }, [task_id]);

  return (
    <div className="p-4">
      <h1>Task Verification</h1>
      <div>
        <p>Status: {status}</p>
      </div>
      {status === "Working..." && <div>Processing task...</div>}
      {status === "done!" && <div>Task completed and new task assigned!</div>}
      {status === "fail :(" && <div>Something went wrong. Please try again.</div>}
    </div>
  );
};

export default VerifyTask;
