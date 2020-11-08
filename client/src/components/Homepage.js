import React from "react";
import styled, { keyframes } from "styled-components";
// import { Carousel } from 'react-responsive-carousel';
import RemoteJpg from "../public/HomepageRemote.jpg";
import CarouselComponent from "./CarouselComponent";

const DescriptionText =
  "Think of it as a journal for your gaming experiences. Jot down notes, keep track of achievements, and even see recent news articles about your favorite games! This is your all in one app to keep you focused on what matters!";

const Homepage = ({ user, userGames }) => {
  if (!user.displayName) {
    return (
      <WrapperNotLoggedIn>
        <Title>Welcome to Gamesmap!</Title>
        <DescCont>
          <Description>{DescriptionText}</Description>
          <RemoteImg src={RemoteJpg} alt="PS4 Remote" />
        </DescCont>
        <CarouselCont>
        <CarouselComponent />
        </CarouselCont>
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

const rotateImg = keyframes`
 {
    from
    {
        transform: rotateZ(0deg);
    }
    to
    {
        transform: rotateZ(180deg);
    }
    to
    {
      transform: rotateZ(360deg);
    }
}
`

const Wrapper = styled.div``;

const WrapperNotLoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;

const CarouselCont = styled.div`
  margin-top: 15px;
`;

const Title = styled.h1`
  font-size: 3vw;
  transform: rotateZ(270deg);
  position: fixed;
  left: -245px; // TODO: Make Absolute on left hand side?
  top: 45%;
`;

const DescCont = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 45px;
`;

const Description = styled.h2`
  text-align: justify;
  flex: 1;
  max-width: 40%;
`;

const RemoteImg = styled.img`
  flex: 1;
  max-height: 300px;
  max-width: 150px;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;
  transform: 0.8s ease-out;
  &:hover {
  animation-name: ${rotateImg};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  }
`;
