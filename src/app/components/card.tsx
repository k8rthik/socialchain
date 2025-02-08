"use client"




function handleSubmit(event : any) {
	// contact back end w task ID
	const id = event.target.className[0];
}


export default function Card(props: any) {
	return (
		
	<div className = "rounded-sm border w-[80%] flex justify-center content-center h-96">
		<div className = " flex flex-col justify-center content-center gap-4 text-center pt-[3%] pb-[3%]">
		<h1>{props.title}</h1>
		<p>{props.description}</p>
		<p>{props.points}</p>
		<img className = "w-32 h-32" src = {`${props.src}`}/>
		<button className={props.cardID} onSubmit={handleSubmit}>Submit Task</button>
		</div>

	</div>
	
	)
}