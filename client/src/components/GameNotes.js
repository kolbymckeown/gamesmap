import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Game from './Game';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const API_URL = process.env.REACT_APP_API_URL;

const GameNotes = ({ game, user }) => {
	const [noteList, setNoteList] = useState([]);
	const themeColor = `${({ theme }) => theme.text}`;
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
				setNoteList(json.data);
			});
	}, [game, user._json.steamid]);

	function handleDelete(item) {
		fetch(`${API_URL}/games/notes/${user._json.steamid}/${game}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ note: item }),
		});

		let deletedItem = item;
		let newState = noteList.filter((note) => {
			if (note !== deletedItem) {
				return true;
			} else return false;
		});
		setNoteList(newState);
	}

	if (!user._json.steamid) {
		return (
			<Load>
				<Loader color={themeColor} />
			</Load>
		);
	}
	return (
		<div>
			<Title>Notes</Title>
			{noteList.map((item) => {
				return (
					<NoteCont>
						<p>{item}</p>
						<button onClick={() => handleDelete(item)}>Delete</button>
					</NoteCont>
				);
			})}
		</div>
	);
};

export default GameNotes;

const NoteCont = styled.div`
	border-bottom: 1px dashed ${({ theme }) => theme.text};
`;

const Title = styled.h2`
	text-align: center;
	font-style: italic;
`;

const Load = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
