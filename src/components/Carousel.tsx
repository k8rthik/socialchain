/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Card from "../components/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { motion } from "framer-motion"



// tasks.map((task) => (
// 	<Link
// 	key={task.id}
// 	href={`/tasks/${task.id}`}
// 	className="block px-4 py-3 bg-blue-500 text-white rounded-md shadow-lg transition-all duration-300 hover:bg-blue-400 transform hover:scale-105"
// 	>
// 	{/* Display the card's title as the task name */}
// 	{task.cardTitle}
// 	</Link>
// ))

// tasks.map((task) => (
//               <Link
//                 key={task.id}
//                 href={`/tasks/${task.id}`}
//                 className="block px-4 py-3 bg-blue-500 text-white rounded-md shadow-lg transition-all duration-300 hover:bg-blue-400 transform hover:scale-105"
//               >
//                 {/* Display the card's title as the task name */}
//                 {task.cardTitle}
//               </Link>
//             ))






export default function Carousel(tasks: any) {

	console.log(tasks.tasks);

	const cards = tasks.tasks.map((task : any) => ({
		title: task.cardTitle,
		description: task.description || "No description available.",
		points: task.difficulty || "0",
		src: `/tasks/${task.id}`,
		cardID: task.card_id
	}));
	  

	const [card, setCard] = useState(cards[0]);
	const [id, setId] = useState(0);
	const [dir, setDir] = useState(1);	


	

	function handleLeft() {
		setId(() => {
			const newId = id === 0 ? cards.length - 1 : id - 1;
			setCard(cards[newId]); // Update the card based on the new ID
			setDir(-1);
		
			return newId; // Return the new ID to update the state
		});
	}

	function handleRight() {
		setId(() => {
			const newId = id === cards.length - 1 ? 0 : id + 1;
			setCard(cards[newId]); // Update the card based on the new ID
			setDir(1);
		
			return newId; // Return the new ID to update the state
		});
	}



	
	return (
	

		<section>
			<div className="w-full flex flex-row justify-center items-center mt-12 mb-12 h-screen gap-12">



				<div onClick={handleLeft}>
					<FontAwesomeIcon className="w-16 h-16 text-[#CDD5D1]" icon={faArrowLeft} />
				</div>
		
		<motion.div
		  key={id}
		  animate={{x: [null, dir * 3000, 0]}}
		  transition={{duration: 0.8, ease: "easeInOut"}}
		>

					<Card title={card.title} description={card.description} points={card.points} src={card.src}
						cardID={card.cardID} />
		</motion.div>
		
				<div onClick={handleRight} >
					<FontAwesomeIcon className="w-16 h-16 text-[#CDD5D1]" icon={faArrowRight} />
				</div>
			</div>


		</section>

	);
}
