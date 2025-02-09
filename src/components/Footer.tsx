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
      <div className="fixed bottom-0 left-0 w-full bg-[#f8f5f2] border-t-2 border-black flex justify-center py-3 shadow-[0px_-4px_0_0_#000]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedMenu(index);
              router.push(
                menuItems[index] === "Home"
                  ? "/home"
                  : `/home/${menuItems[index].toLowerCase()}`,
              );
            }}
            className={`cursor-pointer w-24 text-center text-sm font-bold mx-3 px-2 py-1 rounded-md border-2 border-black transition-all duration-300 
        ${
          selectedMenu === index
            ? "text-yellow-400 bg-white shadow-[2px_2px_0_0_#000] scale-105"
            : "text-black bg-[#f8f5f2] hover:shadow-[2px_2px_0_0_#000] hover:scale-105"
        }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
