import React from "react";
import styled, { keyframes } from "styled-components";
import ReactPlayer from "react-player";
import FooterImg from "../public/FooterImg.png";
import StreamerList from "./StreamerList";
import "./styles/reactPlayer.css";

const DescriptionText =
  "Please Login with the link above, or hang out and watch your favorite streamer!";

const twitchPurple = "#9146FF";

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: ${twitchPurple} }
  `;
const borderWidth = keyframes`
    from { opacity: 0 }
    to { opacity: 100% }
  `;

const bouncy = keyframes`
  0%{top:0em}
 40%{top:0em}
 43%{top:-0.9em}
 46%{top:0em}
 48%{top:-0.4em}
 50%{top:0em}
 100%{top:0em;}
`;

const Homepage = ({ user, userGames }) => {
  const [stream, setStream] = React.useState("");
  const [twitch, setTwitch] = React.useState(false);
  const [streamerList, setStreamerList] = React.useState(
    JSON.parse(localStorage.getItem("my_streamers"))
  );
  const nonDuplicateStreamers = [...new Set(streamerList)];
 
  localStorage.setItem("my_streamers", JSON.stringify(nonDuplicateStreamers));

  // console.log(localStorage.my_streamers.length)

  // const array = localStorage.getItem('testing')
  // console.log(array)

  function handleChange(e) {
    setStream(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTwitch(stream);

    setStreamerList([...streamerList, stream]);
  }

  if (!user.displayName) {
    return (
      <WrapperNotLoggedIn>
        <Outer>
          <Inner>
            <Title>Welcome to Gamesmap!</Title>
          </Inner>
        </Outer>
        <DescCont>
          <Description>{DescriptionText}</Description>
        </DescCont>
        <CenterCont>
          <VidCont>
            <FormCont>
              <Form onSubmit={handleSubmit}>
                <Label>
                  www.twitch.tv/
                  <InputText
                    type="text"
                    value={stream}
                    onChange={handleChange}
                  />
                </Label>
                <Input type="submit" value="Play!" />
              </Form>
              <Example style={{ display: twitch && "none" }}>
                Example: if the full url is 'twitch.tv/
                <strong>thestream</strong>
                ', simply type in <strong>thestream</strong> and press play!
              </Example>
            </FormCont>
            {twitch ? (
              <PlayerCont className="player-wrapper">
                <ReactPlayer
                  className="react-player"
                  playing
                  width="100%"
                  height="100%"
                  url={`twitch.tv/${twitch}`}
                  controls
                />
              </PlayerCont>
            ) : (
              <Type>Type in a stream above to load up the live feed!</Type>
            )}
          </VidCont>
          <ListCont>
            {streamerList && (
              <StreamerList
                streamerList={streamerList}
                setTwitch={setTwitch}
                twitch={twitch}
                stream={stream}
                setStream={setStream}
              />
            )}
          </ListCont>
        </CenterCont>

        <Footer>
          <img
            alt="Twitch, News, Notes and more..."
            color={twitchPurple}
            src={FooterImg}
            height="60vh"
          />
        </Footer>
      </WrapperNotLoggedIn>
    );
  }
  return (
    <Wrapper>
      <LoggedOuter>
        <LoggedInner>
          <LoggedTitle>Gamesmap!</LoggedTitle>
        </LoggedInner>
      </LoggedOuter>
      <Intro>
        Hey {user.displayName}! <br />
        Feel free to hang out here and watch your favorite <br /> games played
        by your favorite streamers!
      </Intro>
      <CenterCont>
        <VidCont>
          <FormCont>
            <Form onSubmit={handleSubmit}>
              <Label>
                www.twitch.tv/
                <InputText type="text" value={stream} onChange={handleChange} />
              </Label>
              <Input type="submit" value="Play!" />
            </Form>
            <Example style={{ display: twitch && "none" }}>
              Example: if the full url is 'twitch.tv/
              <strong>thestream</strong>
              ', simply type in <strong>thestream</strong> and press play!
            </Example>
          </FormCont>
          {twitch ? (
            <PlayerCont className="player-wrapper">
              <ReactPlayer
                className="react-player"
                playing
                width="100%"
                height="100%"
                url={`twitch.tv/${twitch}`}
                controls
              />
            </PlayerCont>
          ) : (
            <Type>Type in a stream above to load up the live feed!</Type>
          )}
        </VidCont>
        <ListCont>
          {streamerList && (
            <StreamerList
              streamerList={streamerList}
              setTwitch={setTwitch}
              twitch={twitch}
              stream={stream}
              setStream={setStream}
            />
          )}
        </ListCont>
      </CenterCont>
      <SignedFooter>
        <img
          alt="Twitch, News, Notes and more..."
          color={twitchPurple}
          src={FooterImg}
        />
      </SignedFooter>
    </Wrapper>
  );
};

export default Homepage;

const PlayerCont = styled.div``;

const CenterCont = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-evenly; */
`;

const ListCont = styled.div`
  position: fixed;
  right: 10%;
  top: 40%;
  text-align: center;
  @media (max-width: 1200px) {
    right: 15px;
  }
  @media (max-width: 800px) {
    position: unset;
  }
`;

const Footer = styled.div`
  position: fixed;
  bottom: 15px;
  /* font-family: "Roobert", sans-serif; */
`;

const SignedFooter = styled.div`
  position: fixed;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  color: ${twitchPurple};
`;

const Intro = styled.h1`
  font-size: 1.5vw;
  padding: 18px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const LoggedOuter = styled.div`
  position: fixed;
  left: 0;
  top: 25%;
`;
const LoggedInner = styled.div`
  position: absolute;
  bottom: 100%;
  transform: rotateZ(90deg);
  transform-origin: 0 100%;
  white-space: nowrap;
`;
const LoggedTitle = styled.h1`
  font-size: 4vw;
  transform: rotate(180deg);
`;

const Title = styled.h1`
  font-size: 3vw;
  transform: rotate(180deg);
`;

const Outer = styled.div`
  position: fixed;
  left: 0;
  top: 105px;
`;
const Inner = styled.div`
  position: absolute;
  bottom: 100%;
  transform: rotateZ(90deg);
  transform-origin: 0 100%;
  white-space: nowrap;
`;

const WrapperNotLoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;

const FormCont = styled.div``;

const Example = styled.p`
  font-style: italic;
  font-size: 0.8em;
`;

const Type = styled.h2``;

const Form = styled.form`
  animation: ${borderWidth} 3s steps(40, end);
  margin-bottom: 15px;
`;

const Label = styled.label`
  color: ${twitchPurple};
`;

const InputText = styled.input`
  border: none;
  border-bottom: 1px solid;
  background: unset;
  animation: ${blink} 1.75s step-end infinite;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-style: italic;
  &:focus {
    animation: unset;
    outline: none;
    border-color: ${twitchPurple};
    caret-color: ${twitchPurple};
  }
`;

const Input = styled.input`
  margin-left: 5px;
  font-weight: bold;
  height: 50px;
  width: 50px;
  position: absolute;
  border-radius: 50%;
  background: none;
  color: ${twitchPurple};
  border: 2px solid ${twitchPurple};
  position: relative;
  animation: ${bouncy} 4s infinite linear;
  outline: none;
  &:active {
    animation: none;
    transform: scale(0.85);
  }
`;

const VidCont = styled.div`
  width: 40vw;

  /* position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
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
