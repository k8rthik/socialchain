"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { data } from "framer-motion/client";

const VerifyTask = () => {
  const { task_id } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verifiedUser, setVerifiedUser] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        router.push("/auth/signup"); // Redirect to login page if not authenticated
      }
    };

    checkSession();
  }, [router]);

  const verifyTask = async () => {
    if (!task_id) {
      setStatus("Invalid task or user ID");
      return;
    }

    setStatus("Verifying...");
    setIsLoading(true);

    try {
      // Fetch the current session to get the verifier's user ID
      const { data: { session } } = await supabase.auth.getSession();
      const verifier_id = session?.user?.id;

      const { data: verifier, error: userError } = await supabase
      .from('user')
      .select('id, name')
      .eq('email', session?.user.email)
      .single();



      if (!verifier) {
        setStatus("You are not authorized to verify.");
        setIsLoading(false);
        return;
      }


      // Step 1: Fetch the task from the task table
      const { data: task, error: taskError } = await supabase
        .from('task')
        .select('id, user_id, card_id, status')
        .eq('id', task_id)
        .single();

       
        const user_id = task?.user_id;


        

        // get user
        const { data: userData, error: usrError } = await supabase
        .from('user')
        .select('id, name')
        .eq('id', user_id)
        .single();


      if (taskError || !task) {
        setStatus("Task not found.");
        setIsLoading(false);
        return;
      }

      // Step 2: Update the task's status to 'completed' and assign verifier_id
      const { error: updateError } = await supabase
        .from('task')
        .update({
          status: 'completed',
          verifier_id: verifier.id, // Assign the verifier's ID
          completed_at: new Date(),
        })
        .eq('id', task_id);


      if (updateError) {
        console.log(updateError);
        setStatus("Error updating task.");
        setIsLoading(false);
        return;
      }


      const {data: xpData} = await supabase.from("user").select('exp').eq("id", user_id).single();
      if (!xpData) {
        setStatus("Error updating exp.");
        setIsLoading(false);
        return;
      }

      const {data: VxpData} = await supabase.from("user").select('exp').eq("id", verifier.id).single();
      if (!xpData) {
        setStatus("Error updating exp.");
        setIsLoading(false);
        return;
      }




      const { data : cardData } = await supabase.from("card").select('title, difficulty').eq("id", task.card_id).single();
      if (!cardData || !VxpData) {
        setStatus("Error updating exp again...");
        setIsLoading(false);
        return null;
      }

      setTaskTitle(cardData.title);

      await supabase.from("user").update({
        exp: xpData.exp + cardData.difficulty
      }).eq("id", user_id);


      await supabase.from("user").update({
        exp: (VxpData.exp + Math.round(cardData.difficulty / 2))
      }).eq("id", verifier.id);

      
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

      setVerifiedUser(userData?.name || "Unknown");
      setStatus("Verified!");
      setIsLoading(false);

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
      setStatus("Verified!");
    } catch (error) {
      console.error("Error during task verification:", error);
      setIsLoading(false);
      setStatus("An error occurred.");
    }
  };

  useEffect(() => {
    if (task_id) {
      verifyTask();
    }
  }, [task_id]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f5f2] text-black font-poppins">
      <div className="bg-white border-4 border-black rounded-[14px] shadow-[8px_8px_0_0_#000] p-10 w-[400px] text-center">
        <h1 className="text-2xl font-bold mb-5">Task Verification</h1>

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
            <p className="mt-4 text-lg font-medium">Verifying...</p>
          </div>
        ) : status === "Verified!" ? (
          <div>
            <p className="text-xl font-semibold mb-4">You verified {verifiedUser}!</p>
            <p className="text-gray-600 mb-6">You have received their task. Pass it on!</p>

            <button
              onClick={() => router.push("/home")}
              className="bg-yellow-400 text-black font-bold py-2 px-6 border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] transition-all duration-300 hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"
            >
              {taskTitle}
            </button>
          </div>
        ) : (
          <p className="text-red-500 font-semibold">{status}</p>
        )}
      </div>
    </div>
  );

};

export default VerifyTask;