"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/home/");
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      console.log("Logged in:", data);
      router.push("/home/");
    } catch (err: any) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-[14px] shadow-[8px_8px_0_0_#000] w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 border-2 border-black rounded-lg p-3 mb-4">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-black uppercase tracking-wide"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:outline-none transition-all text-black"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold textuppercase tracking-wide text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none transition-all text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 border-2 border-black rounded-lg font-bold text-white bg-[#FF6B6B] shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5 transition-all ${loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Continue with Google Button */}
        <div className="mt-6">
          <button
            onClick={async () =>
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
<<<<<<< Updated upstream
                  queryParams: { next: "/home" },
                  redirectTo: process.env.NODE_ENV !== "development" ? `https://socialchain-liart.vercel.app/auth/callback` : "http://localhost:3000/auth/callback",
=======
                  redirectTo:
                    "socialchain-liart.vercel.app/auth/callback?next=/",
>>>>>>> Stashed changes
                },
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

        <div className="mt-6 text-center text-sm text-black">
          <p>Don't have an account?</p>
          <a
            href="/auth/signup"
            className="font-bold text-[#4ECDC4] hover:underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
