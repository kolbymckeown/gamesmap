import React from "react";
import styled from "styled-components";

// const API_KEY = process.env.REACT_APP_API_KEY;

// const userGames = localStorage.getItem('Games')

const Games = ({ user, userGames }) => {
	const [showTimePlayed, setShowTimePlayed] = React.useState(false)
	const openTimePlayed = () => setShowTimePlayed(true)
	console.log(userGames)
	return (
		<Wrapper>
				<Title>All Owned Games</Title>

			<GamesWrap>
				{userGames.games.map((games) => {
					return (
					<IndividualGame>
						<IndividualP>{games.name}</IndividualP>
						<IndividualImg src={`http://media.steampowered.com/steamcommunity/public/images/apps/${games.appid}/${games.img_logo_url}.jpg`} alt="Individual Game Icon" />
						{ showTimePlayed ? <p>{(games.playtime_forever / 60).toFixed(2)} Hours Played</p> : null }
					</IndividualGame>
					)
				})}
				{/* TODO: Things to render for each game:
				img_icon_url
				img_logo_url
				name
				playtime_forever */}
				<button onClick={openTimePlayed}>Show Time Played</button>

			</GamesWrap>
		</Wrapper>
	);
};

export default Games;

const Wrapper = styled.div``;

const Title = styled.h1`
	margin-left: 45px;
	margin-bottom: unset;
`;

const GamesWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const IndividualGame = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 250px;
	max-height: 250px;
	justify-content: space-between;
	margin-left: 8px;
	/* border: 1px solid grey; */
`;

const IndividualP = styled.p`
	margin-bottom: 18px;
`;

const IndividualImg = styled.img`
`;
