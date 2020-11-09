import React, { useEffect, useState } from 'react'
// import Game from './Game';

const API_URL = process.env.REACT_APP_API_URL;


const GameNotes = ({ game, user }) => {
	const [ noteList, setNoteList ] = useState([])
	useEffect(() => {
		fetch(`${API_URL}/games/notes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},			
		})
		.then((res) => res.json())
		.then(json => setNoteList(json))
	}, [setNoteList])
	console.log(noteList)
	return (
		<div>
			This is where the notes go!
			{noteList.map((item) => {
				return (
					<p>{item}</p>
				)
			})}
		</div>
	)
}

export default GameNotes