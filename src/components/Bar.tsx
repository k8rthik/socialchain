/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { useState } from "react";
import {
	VictoryChart,
	VictoryBar,
	VictoryTheme,
	VictoryAxis
} from "victory";



function xpNeededForLevel(level : number) {
	return Math.floor((Math.pow(1.5, level)));
}



	



export default function Bar(props: any) {



	return (

		<div>
			<VictoryChart
				maxDomain={{ y: xpNeededForLevel(props.level) }}
				theme={VictoryTheme.clean}
				
			>
				 <VictoryAxis style={{ 
    axis: {stroke: "transparent"}, 
    ticks: {stroke: "transparent"},
    tickLabels: { fill:"transparent"} 
  }} />
				<VictoryBar
				barWidth={50}
				style={{
					
					labels: {fontSize: 0}, 
					parent: { border: "0" },
					data: {
					  fill: "green"
					}}}
				horizontal
					data={[{
						y: props.exp,
						x: 5
					},
					{
						y: xpNeededForLevel(props.level),
						x: 5
					}
					]}
				/>
			</VictoryChart>
		</div>










	)
}