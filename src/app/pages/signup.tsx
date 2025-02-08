// signup.tsx
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const Signup = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    city: "",
    instagram: "",
    linkedin: "",
    socialTolerance: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { ...formData, uid: user.uid, email: user.email, photoURL: user.photoURL });
      router.push("/home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {!user ? (
        <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">Sign in with Google</button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-80">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="instagram" placeholder="Instagram URL" value={formData.instagram} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="socialTolerance" placeholder="Social Tolerance (1-10)" value={formData.socialTolerance} min="1" max="10" onChange={handleChange} required className="border p-2 rounded" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Complete Signup</button>
        </form>
      )}
    </div>
  );
};

export default Signup;