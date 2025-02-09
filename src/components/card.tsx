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

    <div className = "flex w-full flex-col content-center gap-5 pb-20 text-center  items-center justify-center">

     
        

  
            			<h1>{props.title}</h1>
					<p className="italic">{props.points} points</p>
					<p>{props.description}</p>
					<QRCode value={`http://localhost:3000/${props.src}`} />
          

          
            </div>












  )
}