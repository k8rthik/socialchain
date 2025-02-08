// home.tsx
import { useAuth } from "./authContext";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<{ username: string; photoURL: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data() as { username: string; photoURL: string });
        }
      }
    };
    fetchUserData();
  }, [user]);

  if (!user) {
    return <p className="text-center text-lg">Please log in to continue.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {userData ? (
        <>
          <img src={userData.photoURL} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <h1 className="text-2xl font-semibold">Hello, {userData.username}!</h1>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
