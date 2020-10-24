import React from "react";
import styled from "styled-components";

// const API_KEY = process.env.REACT_APP_API_KEY;

const Games = ({ user, userGames }) => {
	
	return (
		<Wrapper>
			<GamesWrap>
				{userGames.games.map((games) => {
					return (
						<>
					<p>{games.name}</p>
					<img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${games.appid}/${games.img_logo_url}.jpg`} />
					</>
					)
				})}
				{/* TODO: Things to render for each game:
				img_icon_url
				img_logo_url
				name
				playtime_forever */}
			</GamesWrap>
		</Wrapper>
	);
};

export default Games;

const Wrapper = styled.div``;

const GamesWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
