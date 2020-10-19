import React from "react";
import styled from "styled-components";

const API_KEY = process.env.REACT_APP_STEAM_WEB_KEY;

const Games = () => {
	React.useEffect(() => {
		// CORS issue?
		fetch(
			`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=76561197960434622&format=json`
		)
			.then((res) => res.json())
			.then((json) => console.log(json));
	}, []);

	return (
		<Wrapper>
			<GamesWrap>
				<p>Test</p>
			</GamesWrap>
		</Wrapper>
	);
};

export default Games;

const Wrapper = styled.div``;

const GamesWrap = styled.div``;