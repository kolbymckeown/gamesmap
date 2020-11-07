import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const {REACT_APP_API_URL} = process.env

const Modal = ({ game, openModal, show, setShow, user }) => {
  const [note, setNote] = React.useState("");

  const [list, setList] = React.useState([]);

  function handleChange(e) {
    setNote(e.target.value);
  }

  async function handleSubmit(event) {
    // newArray.push(note)
    // const newArray = [...list, note];

    event.preventDefault(); // Important
    // setList(newArray) setList to json.body received from Fetch
    const res = await fetch(`${REACT_APP_API_URL}/games/notes`, { // TODO: Change URL to proper once launched
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
        // TODO: Notes don't load on open, have to click "Add" first...
      body: JSON.stringify({ note, appid: game.appid, userid: user._json.steamid }), 
	})											
	const json = await res.json()
	setList(json.data) // Stretch - handle not response
	
	;	
  }

  function closeModal() {
    setShow(!show);
  }

  return (
    <Cont>
      <X onClick={closeModal}>&#x2716;</X>
      <Wrapper>
        <Header>
          <Title>{game.name}</Title>
          <TimeCont>
            <Time>
              Hours spent grinding away:{" "}
              {(game.playtime_forever / 60).toFixed(2)}!
            </Time>
            <FullPage to={`/game/${game.name}/${game.appid}`}>
              More Info This Way &#8599;
            </FullPage>
          </TimeCont>
        </Header>
        <Img
          src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`}
          alt={`${game.name} Logo`}
        />

        <Form onSubmit={handleSubmit}>
          <Label>
            Add a note:
            <Input type="text" value={note} onChange={handleChange} />
          </Label>
          <Input type="submit" value="Add" />
          {/* TODO: Background Greyed Out to focus Modal */}
        </Form>
        <Ul>
          {list.map((listItem) => {
            if (!listItem) {
              return null;
            }
            return (
              <>
                <Li>{listItem}</Li>
              </>
            );
          })}
        </Ul>
      </Wrapper>
    </Cont>
  );
};

export default Modal;

const Cont = styled.div`
  background-color: ${({ theme }) => theme.text};
  padding: 25px;
  border-radius: 5px;
  position: relative;
`;

const X = styled.button`
  color: black;
  border: none;
  background: none;
  position: absolute;
  right: 2px;
  top: 2px;
  font-size: 18px;
  color: ${({ theme }) => theme.body};
  &:active {
    transform: translate(2px, 2px);
  }
  outline: none;
`;

const Wrapper = styled.div`
  padding: 25px;
  height: 550px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: 0.5s all;
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h1``;

const TimeCont = styled.div`
  display: flex;
  flex-direction: column;
`;

const Time = styled.p`
  font-style: italic;
  font-size: 14px;
  text-align: left;
`;

const FullPage = styled(Link)`
  text-decoration: none;
  &:visited {
    color: ${({ theme }) => theme.text};
  }
`;

// const P = styled.p``;

const Img = styled.img`
  border-radius: 5px;
  width: 230px;
  height: 105px;
`;

const Form = styled.form`
  margin-top: 15px;
`;
const Label = styled.label``;
const Input = styled.input`
  margin-left: 8px;
`;

const Ul = styled.ul`
  list-style-type: "→";
  max-width: 80%;
  max-height: 90%;
  position: relative;
  overflow: auto;
`;

const Li = styled.li``;
