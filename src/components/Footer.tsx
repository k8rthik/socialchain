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
      <div className="flex-grow mt-2 text-center">
        <button
          onClick={handleSignOut}
          className="mt-auto px-6 py-3 mb-10 bg-red-500 text-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] transition-all duration-300 hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"
        >
          Log Out
        </button>
      </div>

      {/* Bottom Menu */}
      <div className="mb-auto sticky bottom-0 left-0 right-0 bg-white border-t-4 border-black flex justify-evenly items-center py-4 shadow-[4px_-4px_0_0_#000]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedMenu(index);
              router.push("/" + menuItems[index]);
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
