"use client";

import Card from "../components/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";



const cards: any[] = [{
	"title": "Test",
	"description": "test desc",
	"points": "1",
	"src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ozWtTnlT6S-59Pd9VyBrIxmCvB9g5spUqw&s",
	"cardID": "1"
},
{
	"title": "Test",
	"description": "test desc",
	"points": "2",
	"src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ozWtTnlT6S-59Pd9VyBrIxmCvB9g5spUqw&s",
	"cardID": "2"
},
{
	"title": "Test",
	"description": "test desc",
	"points": "3",
	"src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ozWtTnlT6S-59Pd9VyBrIxmCvB9g5spUqw&s",
	"cardID": "3"
}];




export default function Main() {
	const [card, setCard] = useState(cards[0]);
	const [id, setId] = useState(0);

	function handleLeft(id: number) {
		if (id === 0) {
			setId(cards.length - 1);
		}
		else {
			setId((id) => id - 1);
		}

		setCard(cards[id]);
	}

	function handleRight(id: number) {
		if (id === (cards.length - 1)) {
			setId(0);
		}
		else {
			setId((id) => id + 1);
		}

		setCard(cards[id]);
	}

	return (


		<section>
			<div className="w-full flex flex-row justify-center items-center mt-12 mb-12 h-screen gap-12">



				<div onClick={() => handleLeft(id)}>
					<FontAwesomeIcon className="w-16 h-16" icon={faArrowLeft} />
				</div>

				<Card title={card.title} description={card.description} points={card.points} src={card.src}
					cardID={card.cardID} />
				<div onClick={() => handleRight(id)} >
					<FontAwesomeIcon className="w-16 h-16" icon={faArrowRight} />
				</div>
			</div>

			<div className="flex justify-evenly">
				<p>In-Progress</p>
				<p>Done</p>
				<p>Approve</p>
				<p>Messasge</p>
				<p>Friends</p>

			</div>

		</section>

	);
}