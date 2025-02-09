/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Card from "../components/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { motion } from "framer-motion"
import Link from "next/link";



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




export default function Main() {
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

			<div className="flex justify-evenly items-center bg-[#946E83] h-16">
				<Link href="/progress">In-Progress</Link>
				<Link href="/Approve">Done</Link>
				<Link href="/Messages">Message</Link>
				<Link href="/Friends">Friends</Link>

			</div>

		</section>

	);
}
