import React from "react";
import styled from "styled-components";

import RemoteJpg from "../public/HomepageRemote.jpg";
const DescriptionText =
  "Think of it as a journal for your gaming experiences. Jot down notes, keep track of achievements, and even see recent news articles about your favorite games! This is your all in one app to keep you focused on what matters!";

const Homepage = ({ user }) => {
  if (!user.displayName) {
    return (
      <WrapperNotLoggedIn>
        <Title>Welcome to Gamesmap!</Title>
        <DescCont>
          <Description>{DescriptionText}</Description>
          <RemoteImg src={RemoteJpg} alt="PS4 Remote" />
        </DescCont>
      </WrapperNotLoggedIn>
    );
  }
  return (
    <Wrapper>
      <p>Homepage</p>
      {console.log(user)}
      <p>{user.displayName}</p>
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div``;

const WrapperNotLoggedIn = styled.div`
  margin: 15px;
`;

const Title = styled.h1`
font-size: 55px;
  transform: rotateZ(270deg);
  position: fixed;
  left: -315px;
  top: 40%;
`;

const DescCont = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Description = styled.h2`
  flex: 1;
  max-width: 50%;
`;

const RemoteImg = styled.img`
  flex: 1;
  max-height: 500px;
  max-width: 300px;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;
