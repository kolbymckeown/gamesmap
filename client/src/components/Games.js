import React from "react";
import styled from "styled-components";
// import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Modal from './Modal'
// import { useDispatch } from 'react-redux'
// import { addGames } from '../actions'
import GamesRender from './GamesRender'

// const API_KEY = process.env.REACT_APP_API_KEY;

// const userGames = localStorage.getItem('Games')

  const Games = ({ user, userGames }) => {
  const [showTimePlayed, setShowTimePlayed] = React.useState(false);
  // const [show, setShow] = React.useState(false);
  // const openTimePlayed = () => setShowTimePlayed(true)
  // const dispatch = useDispatch()

  const openModal = () => {
    setShow(!show)
  }
  const [show, setShow] = React.useState(false);
  
  const openTimePlayed = () => {
    setShowTimePlayed(!showTimePlayed)
  };
  if (!userGames) {
    return (
      <Load>
        <Wrapper>
          <Div>
            <LoginInfo>
              Please login following the link above!
            </LoginInfo>
          </Div>
        </Wrapper>
      </Load>
    );
  }

  return (
    <Wrapper>
      <TitleWrap>
        <Title>All Owned Games</Title>
        <Button onClick={openTimePlayed}>
          {showTimePlayed ? "Hide The Shame" : "Show Time Played"}
        </Button>
      </TitleWrap>
      <GamesWrap>
        {userGames.sort().map(game => {
          return (
            <GamesRender user={user} open={openModal} game={game} showTimePlayed={showTimePlayed} key={game.name}/>

          )
        })}
      </GamesWrap>
      
    </Wrapper>
  );    
};

export default Games;

const Load = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
	transform: translate(-50%, -50%);

`;

const Wrapper = styled.div`
`;

const Div = styled.div`

`;

const LoginInfo = styled.h1`

`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin-left: 45px;
`;

const Button = styled.button`
  margin-left: 25px;
  background: none;
  outline: none;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 8px;
  font-weight: bold;
  letter-spacing: 1.5px;
  width: 175px;
  &:active {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }
`;

const GamesWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

// const IndividualGame = styled.li`
//   display: flex;
//   flex-direction: column;
//   max-width: 175px;
//   max-height: 250px;
//   justify-content: space-between;
//   margin-left: 8px;
//   /* border: 1px solid grey; */
//   position: relative;
//   padding-bottom: 50px;
// `;

// const IndividualP = styled.p`
//   margin-bottom: 18px;
// `;

// const IndividualImg = styled.img``;

// const Time = styled.p`
//   position: absolute;
//   bottom: 0;
//   font-style: italic;
//   font-size: 0.9rem;
//   left: 10%;
// `;


