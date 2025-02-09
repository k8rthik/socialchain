"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Tree from "./Tree";
import { getUserTree } from "./fetchData";
import Footer from "@/components/Footer";

export default function App() {
  const [sampleData, setSampleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Get the authenticated user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      // Fetch the tree data using the user's email
      const treeData = await getUserTree(userData.user.email!);
      setSampleData(treeData as any);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f6ee] p-6 overflow-x-auto">
      {sampleData && <Tree data={sampleData} />}
    </div>
  );
}
