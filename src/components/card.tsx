/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import QRCode from "react-qr-code";




function handleSubmit() {
  // contact back end w task ID
  // const id = event.target.className[0];
}



export default function Card(props: any) {

  const [flip, setFlip] = useState(true);
  const [complete, setComplete] = useState(false);


  return (

    <div className="flex w-full h-full flex-col content-center gap-2 pt-6 pb-6 text-center items-center justify-center">
      <QRCode className="w-32 h-32" value={process.env.NODE_ENV === "development" ? `http://localhost:3000${props.src}` : `https://socialchain-liart.vercel.app${props.src}`} />
      <p className="italic">{props.points} points</p>
      <div className="text-center">
        <button

          className="px-4 py-1 bg-red-800 text-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] transition-all duration-300 hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"
        >
          Forfeit
        </button>
      </div>
    </div>

  )
}
