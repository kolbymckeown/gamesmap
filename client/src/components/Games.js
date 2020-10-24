import React from "react";
import styled from "styled-components";

const API_KEY = process.env.REACT_APP_API_KEY;

const Games = ({ user }) => {
	
	return (
		<Wrapper>
			<GamesWrap>
				<p>Games</p>
			</GamesWrap>
		</Wrapper>
	);
};

export default Games;

const Wrapper = styled.div``;

const GamesWrap = styled.div``;
