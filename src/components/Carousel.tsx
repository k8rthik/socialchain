/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Card from "../components/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { animate, motion } from "framer-motion"
import { s } from "framer-motion/client";







export default function Carousel({ tasks, level, exp }: any) {



	const cards = tasks.map((task: any) => ({
		title: task.cardTitle,
		description: task.description || "No description available.",
		points: task.difficulty || "0",
		src: `/verify/${task.id}`,
		cardID: task.card_id
	}));


	const [card, setCard] = useState(cards[0]);
	const [id, setId] = useState(0);
	const [dir, setDir] = useState(1);
	const [animationState, setAnimationState] = useState("slide1");
	const [reduceMotion, setReduceMotion] = useState(false);





	function handleLeft() {
		setId(() => {
			const newId = id === 0 ? cards.length - 1 : id - 1;
			setDir(-1);
			if (!reduceMotion) {

		
			setAnimationState("slide2");
			setTimeout(() => {
				setCard(cards[newId]); // Update the card based on the new ID
				setAnimationState("slide1");
				
			}, 2000);
		}
		else {
			setCard(cards[newId]);
		}
		

			return newId; // Return the new ID to update the state
		});
	}

	function handleRight() {
		setId(() => {
			const newId = id === cards.length - 1 ? 0 : id + 1;
			setDir(1);
			if (!reduceMotion) {

	
			setAnimationState("slide2");
			setTimeout(() => {
				setAnimationState("slide1");
				setCard(cards[newId]); // Update the card based on the new ID
		
			}, 2000);
		}
		else {
			setCard(cards[newId]);
		}
			return newId; // Return the new ID to update the state
		});
	}


	const variants = {
		slide1: { x: 0 },
		slide2: { x: 1500 * dir },
	  }

	return (


		<section>
			<div className="flex items-center justify-center gap-4">
				<div className="flex items-center" onClick={handleLeft}>
					<FontAwesomeIcon 
						className="w-6 h-6 text-black bg-[#CDD5D1] p-2 border-4 border-black shadow-[4px_4px_0px_black] transition-all duration-300 hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5" 
						icon={faArrowLeft} 
					/>
				</div>

				<motion.div
						
							animate={animationState}
							variants={variants}
							transition={{ duration: 3, ease: "easeInOut" }}
							className={`mt-8 h-[90%] max-w-[65%] w-[80%] bg-white border-4 border-black rounded-[14px] shadow-[8px_8px_0_0_#000]`}
						>
		
					
					<div className="bg-blue-100 ph-4 pb-6 pt-6 flex content-center justify-center align-center h-128 rounded-t-lg">
						<h2 className="text-l ml-24 mr-24 font-bold h-full text-center">
						{card.title}
						</h2>
					</div>

					<div className="flex flex-col items-center justify-center px-16">


						<Card title={card.title} description={card.description} points={card.points} src={card.src}
							cardID={card.cardID} />
					

					
			
					</div>
					</motion.div>


				
		
				<div className="flex items-center" onClick={handleRight}>
					<FontAwesomeIcon 
						className="ml-[6px] w-6 h-6 text-black bg-[#CDD5D1] p-2 border-4 border-black shadow-[4px_4px_0px_black] transition-all duration-300 hover:shadow-[2px_2px_0_0_#000] hover:translate-y-0.5"  
						icon={faArrowRight} 
					/>
				</div>
			</div>
			<div className = "w-full gap-2 flex justify-center items-center mt-4">
			<p>Reduce Motion</p>
			<input type = "checkbox" onChange = {() => setReduceMotion(!reduceMotion)}/>
			</div>
		</section>

	);
}
