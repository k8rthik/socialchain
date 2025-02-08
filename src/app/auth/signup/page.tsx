'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Import the Supabase client

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Optionally, you can store the user in your own user table
      // Insert user data into a Supabase table
      await supabase
        .from('users')
        .insert([{ email, username: 'default' }]);  // Insert other details like username

      console.log('Sign up successful:', data);
      alert('Sign up successful, please check your email for verification!');
    } catch (err : any) {
      console.error('Error signing up:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-white mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
