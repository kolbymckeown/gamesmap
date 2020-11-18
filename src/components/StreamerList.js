import React from "react";
import styled from "styled-components";

const StreamerList = ({ setStream, stream, setTwitch }) => {

	function handleClick(e) {
    setTwitch(e)
    setStream(e)
  }
  
  const nonDuplicateStreamers = JSON.parse(localStorage.getItem('my_streamers'))
  // retrieves the localstorage of streamers
  console.log(nonDuplicateStreamers)
 

  return (
    <Wrapper>
      <Title>Recent Streamers</Title>
      <Ul>
        {nonDuplicateStreamers.map((streamer) => {
          return <Li key={streamer} onClick={() => handleClick(streamer)}>{streamer}</Li>;
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
