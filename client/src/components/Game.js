import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GameNews from "./GameNews";
import GameNotes from "./GameNotes";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const API_URL = process.env.REACT_APP_API_URL;

const Game = ({ user, userGames }) => {
	let { name, id } = useParams();
	const [news, setNews] = useState([]);
	const themeColor = `${({ theme }) => theme.text}`;

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

	if (!userGames) {
		return (
			<Load>
				<Loader color={themeColor} />
			</Load>
		);
	}

	return (
		<Wrapper>
			<GameName>{name}</GameName>
			<Container>
				<News>
					<H2>News</H2>
					{news.map((piece) => {
						return <GameNews piece={piece} />;
					})}
				</News>
				<UserInfo>
					<GameNotes game={id} user={user} />
				</UserInfo>
			</Container>
		</Wrapper>
	);
};

export default Game;

const Load = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
	margin-left: 8px;
`;

const H2 = styled.h2`
	text-align: center;
	font-style: italic;
`;

const GameName = styled.h1`
	text-align: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	border-top: 3px solid ${({ theme }) => theme.text};
`;

const News = styled.div`
	flex: 1;
	border-right: 3px solid ${({ theme }) => theme.text};
`;

const UserInfo = styled.div`
	flex: 1;
`;
