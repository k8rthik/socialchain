/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Card from "../components/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { motion } from "framer-motion"
import Bar from "../components/Bar";



const cards: any[] = [{
	"title": "Test",
	"description": "test 1",
	"points": "1",
	"src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ozWtTnlT6S-59Pd9VyBrIxmCvB9g5spUqw&s",
	"cardID": "1"
},
{
	"title": "Test",
	"description": "test 2",
	"points": "2",
	"src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ozWtTnlT6S-59Pd9VyBrIxmCvB9g5spUqw&s",
	"cardID": "2"
},
{
	"title": "Test",
	"description": "test 3",
	"points": "3",
	"src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ozWtTnlT6S-59Pd9VyBrIxmCvB9g5spUqw&s",
	"cardID": "3"
}];




export default function Carousel({tasks, level, exp} : any) {



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
			<div className="mt-8 mx-auto h-fit w-[80%] bg-white border-4 border-black rounded-[14px] shadow-[8px_8px_0_0_#000]">
				<div className="bg-blue-100 pb-6 pt-6 flex content-center align-center justify-center h-128 rounded-[14px]">
					<h2 className="text-3xl font-bold h-full text-center">
						Your Tasks Dashboard
					</h2>
				</div>
				<div className="h-32 w-128 mt-10 text-center">
					<h1>{`Level: ${level}, exp: ${exp}`}</h1>
					<Bar level={level} exp={exp} />
				</div>
		<div className = "flex flex-row pl-16 pr-16 content-center justify-center">



					<div onClick={handleLeft}>
						<FontAwesomeIcon className="w-16 h-16 text-[#CDD5D1]" icon={faArrowLeft} />
					</div>

					{/* <motion.div
						key={id}
						animate={{ x: [null, dir * 3000, 0] }}
						transition={{ duration: 0.8, ease: "easeInOut" }}
					> */}

						<Card title={card.title} description={card.description} points={card.points} src={card.src}
							cardID={card.cardID} />
					{/* </motion.div> */}

					<div className="flex align-end" onClick={handleRight} >
						<FontAwesomeIcon className="w-16 h-16 text-[#CDD5D1]" icon={faArrowRight} />
					</div>
				</div>
			</div>
	


		</section>

	);
}
