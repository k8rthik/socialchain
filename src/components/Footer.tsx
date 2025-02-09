"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  // Bottom Menu Items
  const menuItems = ["Home", "Graph", "Profile"];

  return (
    <div>
      {/* <div className="flex-grow mt-2 text-center bg-white">
        
      </div> */}

      {/* Bottom Menu */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-black flex justify-center py-4">

        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedMenu(index);
              router.push(`/${menuItems[index].toLowerCase()}`);
            }}
            className={`cursor-pointer w-20 text-center text-sm font-bold transition-all duration-300 ${
              selectedMenu === index
                ? "text-yellow-400 scale-110"
                : "text-black hover:scale-110"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
