import { supabase } from "@/lib/supabase";

const assignRandomTasksToUser = async (userId: string) => {
    try {
        // Fetch all available cards from the card pool
        const { data: cardPool, error: cardError } = await supabase
          .from("card")
          .select("id")
          .limit(5); // Get the first 5 cards
    
        if (cardError) {
          console.error("Error fetching card pool:", cardError);
          return;
        }
    
        // Ensure we got at least 5 cards
        if (cardPool.length < 5) {
          console.error("Not enough cards in the card pool");
          return;
        }
    
        // Create tasks for the user, each task linked to a cardId from the pool
        const tasksToAssign = cardPool.map((card) => ({
          userId: userId,
          cardId: card.id, // Set the cardId of the task to the selected card
          status: "assigned", // Set the status to "assigned"
        }));
    
        // Insert the tasks into the Task table
        const { data, error: insertError } = await supabase
          .from("task")
          .insert(tasksToAssign);
    
        if (insertError) {
          console.error("Error assigning tasks to user:", insertError);
          return;
        }
    
        console.log("Successfully assigned tasks to user:", data);
      } catch (error) {
        console.error("Error:", error);
      }
};

export { assignRandomTasksToUser };