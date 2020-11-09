import React from "react";
import styled from "styled-components";
// import { Carousel } from 'react-responsive-carousel';
import CarouselComponent from "./CarouselComponent";
import ReactPlayer from 'react-player'

const DescriptionText =
  "Think of it as a journal for your gaming experiences. Jot down notes, keep track of achievements, and even see recent news articles about your favorite games! This is your all in one app to keep you focused on what matters!";

const Homepage = ({ user, userGames }) => {
  const [stream, setStream] = React.useState('')
  const [twitch, setTwitch] = React.useState('')

  function handleChange(e) {
    setStream(e.target.value) 
    console.log(stream)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTwitch(stream)
  }


  if (!user.displayName) {
    return (
      <WrapperNotLoggedIn>
        <Title>Welcome to Gamesmap!</Title>
        <DescCont>
          <Description>{DescriptionText}</Description>
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
      <p>{user.displayName}</p>
      <Form onSubmit={handleSubmit}>
        <Label>Enter the channel:
          <Input type="text" value={stream} onChange={handleChange} />
        </Label>
        <Input type="submit" value="Twitch" />
      </Form>
      {/* <CarouselCont>
        <CarouselComponent />
      </CarouselCont> */}
      <VidCont>
        <ReactPlayer url={`twitch.tv/${twitch}`}controls />
      </VidCont>
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div``;

const WrapperNotLoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;

const Form = styled.form``;
const Label = styled.label``;
const Input = styled.input``;

const VidCont = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

// const RemoteImg = styled.img`
//   flex: 1;
//   max-height: 300px;
//   max-width: 150px;
//   border-top-left-radius: 30px;
//   border-bottom-right-radius: 30px;
//   transform: 0.8s ease-out;
//   &:hover {
//   animation-name: ${rotateImg};
//   animation-duration: 5s;
//   animation-iteration-count: infinite;
//   }
// `;
