import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addGames } from "../actions";
import Modal from "./Modal";

const GamesRender = ({ game, showTimePlayed, user }) => {
  // const [individualGame, setIndividualGame] = React.useState({})
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();

  const onClickHandler = (game) => {
    openModal();
    // setIndividualGame(game)
  };
  const openModal = () => {
    setShow(!show);
  };

  const { name, appid, img_logo_url, playtime_forever } = game;
  const playTime = (playtime_forever / 60).toFixed(2);
  return (
    <>
      <IndividualGame onClick={() => onClickHandler(game)} key={name}>
        {/* TODO: Redux State Management - right now all games being set  */}
        <IndividualP onClick={() => dispatch(addGames(game))}>
          {name}
        </IndividualP>

        <IndividualImg
          src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${img_logo_url}.jpg`}
          alt={`${name} Logo`}
        />
        {showTimePlayed && 
		<Time>
			
			{playTime} Hours Played
		</Time>}
      </IndividualGame>
      <ModalWrap>
        {show && (
          <Modal open={openModal} show={show} setShow={setShow} game={game} user={user} />
        )}
      </ModalWrap>
    </>
  );
};

export default GamesRender;

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

const ModalWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const IndividualImg = styled.img``;

const Time = styled.p`
  position: absolute;
  bottom: 0;
  font-style: italic;
  font-size: 0.9rem;
  left: 10%;
`;
