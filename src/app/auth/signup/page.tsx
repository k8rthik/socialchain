"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase"; // Import the Supabase client
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NODE_ENV === "development" ? "http://localhost:3000/home" : "https://socialchain-liart.vercel.app/home",
        },
      });

      if (error) throw error;

      // Optionally, you can store the user in your own user table
      // Insert user data into a Supabase table
      console.log("Sign up successful:", data);
      router.push("/auth/login");
      alert("Sign up successful, please check your email for verification!");
    } catch (err: any) {
      console.error("Error signing up:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-[14px] shadow-[8px_8px_0_0_#000] w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Join the Club 🎉
        </h2>

        {error && (
          <div className="bg-red-100 border-2 border-black rounded-lg p-3 mb-4">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-black uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:outline-none transition-all text-black"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-black uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none transition-all text-black"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 border-2 border-black rounded-lg font-bold text-white bg-[#FF6B6B] shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5 transition-all ${loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Creating Magic..." : "Get Started"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={async () =>
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: `http://localhost:3000/auth/callback` },
              })
            }
            className="w-full py-3 px-4 border-2 border-black rounded-lg font-bold bg-white text-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="font-bold text-[#4ECDC4] hover:underline"
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
