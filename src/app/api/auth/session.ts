import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    // Return session or null if no session exists
    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching session' });
  }
}
