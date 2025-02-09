"use client";

import React, { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-[#f7f6ee] p-6 font-medium text-gray-900">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
        {/* Header Section */}
        <h1 className="mb-6 text-6xl font-black uppercase tracking-tight text-[#FF6B6B] drop-shadow-[3px_3px_0_#000]">
          Social\nChain
        </h1>

        {/* Tagline */}
        <p className="mb-8 max-w-2xl text-center text-xl leading-relaxed text-gray-800">
          Join your community, complete daily challenges, verify them, and pass
          them forward.{" "}
          <span className="font-black text-[#FF6B6B]">
            Overcome your social anxiety
          </span>
          , climb the leaderboard, and{" "}
          <span className="font-black text-[#FF6B6B]">grow your chain!</span>
        </p>

        {/* Auth Buttons */}
        <div className="mb-12 flex items-center gap-4">
          <Link
            href="/auth/signup"
            className="flex h-12 items-center justify-center rounded-lg border-2 border-black bg-[#FF6B6B] px-8 shadow-[3px_3px_0_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Sign Up
          </Link>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white">
            <span className="text-sm font-bold">or</span>
          </div>
          <Link
            href="/auth/login"
            className="flex h-12 items-center justify-center rounded-lg border-2 border-black bg-black px-8 text-white shadow-[3px_3px_0_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Log In
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid w-full gap-6 md:grid-cols-3">
          <div className="rounded-xl border-2 border-black bg-[#ff99cc] p-6 shadow-[5px_5px_0_0_#000]">
            <h3 className="mb-3 text-xl font-black">Join & Connect</h3>
            <p className="leading-relaxed text-gray-800">
              Claim your spot in local communities and connect social profiles
              to start chaining
            </p>
          </div>

          <div className="rounded-xl border-2 border-black bg-[#fff44f] p-6 shadow-[5px_5px_0_0_#000]">
            <h3 className="mb-3 text-xl font-black">Daily Challenges</h3>
            <p className="leading-relaxed text-gray-800">
              Skill-based missions with proof verification to keep your chain
              growing strong
            </p>
          </div>

          <div className="rounded-xl border-2 border-black bg-[#7af6ff] p-6 shadow-[5px_5px_0_0_#000]">
            <h3 className="mb-3 text-xl font-black">Progress Tracking</h3>
            <p className="leading-relaxed text-gray-800">
              Interactive chain visualization, global leaderboards, and
              reputation analytics
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t-2 border-black pt-6 text-center text-sm text-gray-600">
          © 2025 SocialChain — Chain reactions of awesome
        </footer>
      </div>
    </div>
  );
}
