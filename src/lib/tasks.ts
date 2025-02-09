import { supabase } from "@/lib/supabase";

const addTasksToCardPool = async () => {
  const taskTitles = [
    "Find 3 hobbies from a stranger",
    "Say 'Hello' to a Barista",
    "Talk to 5 people in 10 minutes",
    "Get a bid into a frat",
    "Explain blockchain to a grandma",
    "Buy coffee for someone",
    "Sit with a stranger eating alone and talk to them for 5 minutes",
    "Sit next to a group of people and don't say anything for 2 minutes",
    "Make up an event and have 10 people attend",
    "Create a frat and get into IFC",
    "Smile and wave at a stranger",
    "Attend a frat party and talk to one person",
    "Ask to borrow a pen or for help reading something",
    "Eat alone at a restaurant and have the waiter verify you did it",
    "Ask a stranger for an opinion",
    "Talk in a quiet place like library or waiting room or where conversation isn't the norm",
    "Introduce yourself to a new neighbor",
    "Try a new type of cuisine and share your experience",
    "Compliment a stranger on something specific (like their outfit or smile)",
    "Take a walk without your phone and notice something new in your neighborhood",
    "Write a thank-you note to someone who has helped you recently",
    "Volunteer for an hour at a local charity",
    "Learn a new word and use it in conversation today",
    "Share a funny joke with a friend or family member",
    "Offer to help someone carry their groceries",
    "Read a book outside of your usual genre",
    "Plant a flower or vegetable in a community garden",
    "Send a positive message to someone you follow on social media",
    "Try a new hobby or activity you've been curious about",
    "Donate unused items to a local charity or thrift store",
    "Leave a positive review for a small business you enjoy",
    "Cook a meal for someone who could use a break",
    "Attend a local event or workshop to learn something new",
    "Write a short story or poem and share it with a friend",
    "Send a handwritten letter to a family member or friend",
    "Visit a park or nature reserve you haven't been to before",
    "Listen to a new genre of music and share your favorite song from it",
    "Offer to walk a neighbor's dog or pet-sit for a day",
    "Watch a classic movie you've never seen before",
    "Start a conversation with a fellow student or colleague you haven't talked to much",
    "Learn a simple magic trick and perform it for friends or family",
    "Bake cookies or another treat and share them with your neighbors",
    "Attend a local sports event or game and cheer for the home team",
    "Take a different route to work or school and notice the changes in your surroundings",
    "Learn a few phrases in a new language and try them out with someone who speaks it",
    "Write down three things you're grateful for today and share them with someone close to you"
  ];

  const cardsToInsert = taskTitles.map((title) => ({
    title,
    description: "This is a social challenge task.",
    difficulty: 25
  }));


  // print out users
  const { data: users, error } = await supabase
    .from("users")
    .select("*");

  // Insert the tasks as cards into the Card table
  try {
    const { data, error } = await supabase
      .from("card")
      .insert(cardsToInsert); // Using `upsert` ensures it doesn't add duplicates

    if (error) {
      console.error("Error inserting cardd:", error);
      return;
    }

    console.log("Successfully added tasks to card pool:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export { addTasksToCardPool };