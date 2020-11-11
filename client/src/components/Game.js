import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GameNews from './GameNews'
import GameNotes from './GameNotes'

const API_URL = process.env.REACT_APP_API_URL;

const Game = ({ user, userGames }) => {
	// console.log(userGames, 'here')
	let { name, id } = useParams();
	// console.log(user.id)
	const [news, setNews] = useState([]);
	const [stats, setStats] = useState([])
	
	useEffect(() => {
		fetch(`${API_URL}/game/${name}/${id}`, {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true,
			},
		})
			.then((resp) => resp.json())
			.then((json) => {
				setNews(json.body);
			});
	}, [setNews, id, name]);

	useEffect(() => {
		fetch(`${API_URL}/game/${name}/${id}/stats/${user.id}`, {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
				"Access-Control-Allow-Credentials": true,
			},
		})
		.then((resp) => resp.json())
		.then((json) => console.log(json))
		console.log('here')
	}, [setStats, id, name, user.id])
	const achievements = stats.achievements
	// console.log(achievements)
	// if (!achievements) {
	// 	// Games with no Achievements (i.e Warframe) will never Load...
	// 	return (
	// 		<div>
	// 			Waiting...
	// 		</div>
	// 	)
	// }
	if (!userGames) {
		return (
			<div>
				waiting
			</div>
		)
	}

	return (
		<Wrapper>
			<p>
				{name} / {id}
			</p>
			<Container>
			<News>
			{news.map((piece) => {
                return (
                    <GameNews piece={piece} />
                )
			})}
			</News>
			<UserInfo>
				{achievements ? `The user has ${(achievements).length} achievements!` : 'This is here'}
					{/* TODO: Put the Ternary options each a component */}
					<GameNotes game={id} user={user} />
			</UserInfo>
			</Container>
		</Wrapper>
	);
};

export default Game;

const Wrapper = styled.div`
	margin-left: 8px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;

`;

const News = styled.div`
	flex: 1;
`;

const UserInfo = styled.div`
	flex: 1;
`;