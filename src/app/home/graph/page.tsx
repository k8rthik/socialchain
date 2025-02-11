"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Tree from "./Tree";
import { getUserTree } from "./fetchData";
import Footer from "@/components/Footer";

export default function App() {
  const [sampleData, setSampleData] = useState(null);
  const [sampleData2, setSampleData2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Get the authenticated user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      const { data: user, error: userrError } = await supabase
      .from('user')
      .select('id, name, referrer')
      .eq('email', userData.user.email)
      .single();

      // Fetch the tree data using the user's email
      if (userrError) {
        throw userrError;
      }

      // console.log(userData);
      if (user.referrer) {
        const treeData = await getUserTree(user.referrer);
        const treeData2 = await getUserTree(userData.user.email!);
        setSampleData(treeData as any);
        setSampleData2(treeData2 as any);
      } else {
        const treeData = await getUserTree(userData.user.email!);
        setSampleData(treeData as any);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f6ee] p-6">
      {/* also pass in sampleData2 */}
      {sampleData && <Tree data={sampleData} data2={sampleData2} />}
    </div>
  );
}
