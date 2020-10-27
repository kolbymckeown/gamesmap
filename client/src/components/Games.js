import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from './Modal'
import { useDispatch } from 'react-redux'
import { addGames } from '../actions'

// const API_KEY = process.env.REACT_APP_API_KEY;

// const userGames = localStorage.getItem('Games')

  const Games = ({ user, userGames }) => {
  const [showTimePlayed, setShowTimePlayed] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  // const openTimePlayed = () => setShowTimePlayed(true)
  const [individualGame, setIndividualGame] = React.useState({})
  const dispatch = useDispatch()
  
  const openTimePlayed = () => {
    showTimePlayed === false
      ? setShowTimePlayed(true)
      : setShowTimePlayed(false);
  };

  const openModal = () => {
    modal === false 
    ? setModal(true)
    : setModal(false)
  }

  console.log(userGames);

  if (!userGames) {
    return (
      <Load>
        <Loader
          type="Audio"
          color={`${({ theme }) => theme.text}`}
          height={180}
          width={180}
        />
      </Load>
    );
  }

  return (
    <Wrapper>
      <TitleWrap>
        <Title>All Owned Games</Title>
        <Button onClick={openTimePlayed}>
          {showTimePlayed === false ? "Show Time Played" : "Hide The Shame"}
        </Button>
      </TitleWrap>
      <GamesWrap>
        {userGames.map((games) => {
          return (
            <IndividualGame onClick={openModal} key={games.name}>
              {/* TODO: Redux State Management - right now all games being set  */}
            <IndividualP onClick={() => dispatch(addGames({ userGames }))}>{games.name}</IndividualP>
            {console.log(games)}
              <IndividualImg
                src={`http://media.steampowered.com/steamcommunity/public/images/apps/${games.appid}/${games.img_logo_url}.jpg`}
                alt="Individual Game Icon"
              />
              {showTimePlayed ? (
                <Time>
                  {(games.playtime_forever / 60).toFixed(2)} Hours Played
                </Time>
              ) : null}
              
              {console.log(modal)}
            </IndividualGame>
          );
        })}
      </GamesWrap>
      <ModalWrap>
      {modal ? <Modal userGames={userGames} /> : null}
      {/* TODO: Pass whichever clicked on game data to the modal */}
      </ModalWrap>
    </Wrapper>
  );    
};

export default Games;

const Load = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Wrapper = styled.div`
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

const IndividualGame = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 175px;
  max-height: 250px;
  justify-content: space-between;
  margin-left: 8px;
  /* border: 1px solid grey; */
  position: relative;
  padding-bottom: 50px;
`;

const IndividualP = styled.p`
  margin-bottom: 18px;
`;

const IndividualImg = styled.img``;

const Time = styled.p`
  position: absolute;
  bottom: 0;
  font-style: italic;
  font-size: 0.9rem;
  left: 10%;
`;

const ModalWrap = styled.div`
  margin: auto;
  position: absolute;
  top: 10%;
  left: 40%;
`;

