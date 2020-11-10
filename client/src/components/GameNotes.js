import React, { useEffect, useState } from 'react'
// import Game from './Game';

const API_URL = process.env.REACT_APP_API_URL;


const GameNotes = ({ game, user }) => {
	const [ noteList, setNoteList ] = useState([])
	useEffect(() => {
		const request = `${API_URL}/games/notes/${user._json.steamid}/${game}`;
		fetch(request, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},			
		})
		.then((res) => res.json())
		.then((json) => {
			setNoteList(json.data)
		})
	}, []) // Should reload when setNoteList is run in handleDelete()

	function handleDelete(item) {
		fetch(`${API_URL}/games/notes/${user._json.steamid}/${game}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ note: item })
		})
		
		
			let deletedItem = item
			let newState = noteList.filter(note => {
				if(note !== deletedItem) {
					return true
				} else return false
			})
			setNoteList(newState)
		
	}

	if (!user._json.steamid) {
		return (
			<div>
				waiting
			</div>
		)
	}
	return (
		<div>
			This is where the notes go!
			{noteList.map((item) => {
				return (
					<div>
					<p>{item}</p>
					<button onClick={() => handleDelete(item)}>Delete</button>
					</div>
				)
			})}
		</div>
	)
}

export default GameNotes