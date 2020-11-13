import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon
} from 'react-share';
// TODO: Change Share URL once deployed (will not work on localhost)
const API_URL = process.env.REACT_APP_API_URL;
const URL = `http://localhost:3000/games`;
const GameNotes = ({ game, user }) => {
  const [note, setNote] = React.useState("");
  const [noteList, setNoteList] = useState([]);
  const themeColor = `${({ theme }) => theme.text}`;

  function handleChange(e) {
    setNote(e.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault(); // Important
    const res = await fetch(`${API_URL}/games/notes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // TODO: Notes don't load on open, have to click "Add" first...
      body: JSON.stringify({ note, appid: game, userid: user._json.steamid }),
    });
    const json = await res.json();
    
    setNoteList(json.data); // Stretch - handle no response
    setNote(""); // clears input field once the list is added
  }

  useEffect(() => {
    const request = `${API_URL}/games/notes/${user._json.steamid}/${game}`;
    fetch(request, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setNoteList(json.data);
      });
  }, []); // useCallback , useMemo

  function handleDelete(item) {
    fetch(`${API_URL}/games/notes/${user._json.steamid}/${game}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: item }),
    });

    let deletedItem = item;
    let newState = noteList.filter((test) => {
      if (test !== deletedItem) {
        return true;
      } else return false;
    });
    setNoteList(newState);
  }

  if (!user._json.steamid) {
    return (
      <Load>
        <Loader color={themeColor} />
      </Load>
    );
  }
  return (
    <div>
      <Title>Notes</Title>
      <Form onSubmit={handleSubmit}>
        <Label for="notes">
          Add a note: 
          <TextArea id="notes" rows="3" cols="50" type="text" value={note} onChange={handleChange} />
        </Label>
        <Input type="submit" value="Add" disabled={!note} />
        {/* TODO: Background Greyed Out to focus Modal */}
      </Form>
      <Ul>
        {noteList.map((item) => {
          return (
            <NoteCont>
              <Li>
                <Note>{item}</Note>
                <DeleteButton onClick={() => handleDelete(item)}>
                  X
                </DeleteButton>
                <SocialIcons>
                <FacebookShareButton style={{ margin: '8px' }} url={URL} quote="placeholder" hashtag="#placeholder"><FacebookIcon round={true} size={25} /></FacebookShareButton>
                <TwitterShareButton url={URL} quote="placeholder" hashtag="#placeholder"><TwitterIcon round={true} size={25} /></TwitterShareButton>
                </SocialIcons>
              </Li>
            </NoteCont>
          );
        })}
      </Ul>
    </div>
  );
};

export default GameNotes;

const Note = styled.p`
  margin-bottom: 0;
`;

const SocialIcons = styled.div`
  display: flex;
`;

const Form = styled.form`
  margin-top: 15px;
  padding-left: 15px;
`;
const Label = styled.label`
  display: block;
`;
const Input = styled.input`
  margin-top: 5px;
`;

const TextArea = styled.textarea`
  display: block;
  font-family: inherit;
  resize: none;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  margin: 0;
  padding-left: 0;
`;

const Li = styled.li`
  padding-left: 10px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const DeleteButton = styled.button`
  position: relative;
  height: 30px;
  width: 20px;
  margin: 7px 7px;
  padding: 5px 5px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.text};
  border: 2px ${({ theme }) => theme.text} solid;
  border-radius: 4px;
  text-transform: uppercase;
  outline: 0;
  overflow: hidden;
  background: none;
  z-index: 1;
  cursor: pointer;
  transition: 0.08s ease-in;
  -webkit-transition: 0.08s ease-in;
  text-align: left;
  padding-left: 3px;
  &:before {
    content: "Delete";
    position: absolute;
    color: ${({ theme }) => theme.text};
    left: 50%;
    opacity: 0;
    transition: all 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  &:hover:before {
    left: 30%;
    opacity: 1;
  }
  &:hover {
    width: 125px;
  }
`;

const NoteCont = styled.div`
  border-bottom: 1px dashed ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-style: italic;
`;

const Load = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
