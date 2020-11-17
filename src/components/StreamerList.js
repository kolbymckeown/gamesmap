import React from "react";
import styled from "styled-components";

const StreamerList = ({ streamerList, twitch, setTwitch }) => {

	function handleClick(e) {
		// setTwitch(null)
		setTwitch(e)
		console.log(e)
	}

  return (
    <Wrapper>
      <Title>Recent Streamers</Title>
      <Ul>
        {streamerList.map((streamer) => {
          return <Li onClick={() => handleClick(streamer)}>{streamer}</Li>;
        })}
      </Ul>
    </Wrapper>
  );
};

export default StreamerList;

const Wrapper = styled.div`
	text-align: center;
`;

const Title = styled.h1`
  font-size: 22px;
  text-decoration: underline;
`;

const Ul = styled.ul``;

const Li = styled.li`
  list-style-type: circle;
  text-align: left;
  cursor: pointer;
`;
