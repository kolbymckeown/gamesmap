import React from "react";
import styled from "styled-components";
import GamesRender from "./GamesRender";

const Games = ({ user, userGames }) => {
	const [showTimePlayed, setShowTimePlayed] = React.useState(false);

	const openModal = () => {
		setShow(!show);
	};
	const [show, setShow] = React.useState(false);

	const openTimePlayed = () => {
		setShowTimePlayed(!showTimePlayed);
	};

	if (!userGames) {
		return (
			<Load>
				<Wrapper>
					<Div>
						<LoginInfo>Please login following the link above!</LoginInfo>
					</Div>
				</Wrapper>
			</Load>
		);
	}

	return (
		<Wrapper>
			<TitleWrap>
				<Title>All Owned Games</Title>
				<Button onClick={openTimePlayed}>
					{showTimePlayed ? "Hide The Shame" : "Show Time Played"}
				</Button>
			</TitleWrap>
			<GamesCont>
			<GamesWrap>
				{userGames.map((game) => {
					return (
						<GamesRender
							user={user}
							open={openModal}
							game={game}
							showTimePlayed={showTimePlayed}
							key={game.name}
						/>
					);
				})}
			</GamesWrap>
			</GamesCont>
		</Wrapper>
	);
};

export default Games;

const Load = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Wrapper = styled.div``;

const Div = styled.div``;

const LoginInfo = styled.h1``;

const TitleWrap = styled.div`
	display: flex;
	align-items: center;
`;

const Title = styled.h1`
	margin-left: 45px;
`;

const Button = styled.button`
	margin-left: 25px;
	background: none;
	outline: none;
	border: 1px solid ${({ theme }) => theme.text};
	color: ${({ theme }) => theme.text};
	border-radius: 3px;
	padding: 8px;
	font-weight: bold;
	letter-spacing: 1.5px;
	width: 175px;
	&:active {
		background: ${({ theme }) => theme.text};
		color: ${({ theme }) => theme.body};
	}
`;

const GamesCont = styled.div`
	display: flex;
	justify-content: center;
`;

const GamesWrap = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 50px;
`;