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

		<div >

      <motion.div
         onClick={() => setFlip(!flip)} className="rounded-md border-[#b4a6ab] border w-[600px] flex justify-center content-center h-[800px] bg-[#b4a6ab] text-black"
        transition={{ duration: 0.7 }}
        animate={{ rotateY: flip ? 0 : 180 }}
      >
        <motion.div
          transition={{ duration: 0.7 }}
          animate={{ rotateY: flip ? 0 : 180 }}
          	className="flex flex-col justify-center content-center items-center w-vw text-center pt-[3%] pb-[3%]"
        >
          <motion.div
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flip ? 0 : 180 }}
            className={complete ? "backface-hidden bg-[#b4a6ab] h-96" : "backface-hidden hidden bg-[#b4a6ab] h-96"}
			onAnimationComplete={() => setComplete((complete) => !complete)}

          >
            			<h1>{props.title}</h1>
					<p className="mb-12">{props.points}</p>
					<img className="w-32 h-32 mb-12 ml-auto mr-16" src={`${props.src}`} />
					<QRCode value={`http://localhost:8000/qr/${props.cardID}`} />
          </motion.div>
          <motion.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: flip ? 180 : 0 }}
            // style={{ display: flip ? "none" : "block" }}
            transition={{ duration: 0.7 }}
            className={complete ? "backface-hidden h-96 bg-[#b4a6ab] hidden" : " backface-hidden h-96 bg-[#b4a6ab]"}
          >
          <p>{props.description}</p>
          </motion.div>
    
        </motion.div>
      </motion.div>
    </div>

	

		
		
	




			)
}