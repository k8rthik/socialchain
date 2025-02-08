'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const UserStatus = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) setUser(session.user);
        else setUser(null);
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear user state
    router.push('/login'); // Redirect to the login page after sign out
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Please log in.</p>;

  return (
    <div className="text-center">
      <p>Welcome back, {user.email}</p>
      <button
        onClick={handleSignOut}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserStatus;
