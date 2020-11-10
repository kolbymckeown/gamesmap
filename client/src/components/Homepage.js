import React from "react";
import styled from "styled-components";
// import { Carousel } from 'react-responsive-carousel';
import CarouselComponent from "./CarouselComponent";
import ReactPlayer from 'react-player'

const DescriptionText =
  "Think of it as a journal for your gaming experiences. Jot down notes, keep track of achievements, and even see recent news articles about your favorite games! This is your all in one app to keep you focused on what matters!";

const Homepage = ({ user, userGames }) => {
  const [stream, setStream] = React.useState('')
  const [twitch, setTwitch] = React.useState(false)

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
      <Intro>Hey {user.displayName}! <br />Feel free to hang out here and watch your favorite <br /> games played by your favorite streamers! </Intro>
      <VidCont>

      <FormCont>
      <Form onSubmit={handleSubmit}>
        <Label>Enter the channel:
          <Input type="text" value={stream} onChange={handleChange} />
        </Label>
        <Input type="submit" value="Play!" />
      </Form>
      <Example>Example: if the full url is 'twitch.tv/<strong>thestream</strong>', simply type in <strong>thestream</strong> and press play!</Example>
      </FormCont>
      {/* <CarouselCont>
        <CarouselComponent />
      </CarouselCont> */}
        {twitch 
        ? <ReactPlayer url={`twitch.tv/${twitch}`}controls />
        : <Type>Type in a stream above to load up the live feed!</Type>}
      </VidCont>
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  text-align: center;
`;

const Intro = styled.h1`
  font-size: 2vw;
  padding: 18px;
  text-align: center;
`;

const WrapperNotLoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;

const FormCont = styled.div`

`;

const Example = styled.p`
  font-style: italic;
  font-size: 0.8em;
`;

const Type = styled.h2``;

const Form = styled.form``;
const Label = styled.label``;
const Input = styled.input`
  margin-left: 5px;
`;

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
