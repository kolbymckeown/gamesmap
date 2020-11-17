import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon
} from 'react-share';
import { v4 as uuidv4 } from 'uuid';
import ImageUpload from './ImageUpload'

const API_URL = process.env.REACT_APP_API_URL;
const URL = `http://localhost:3000/games`;
const GameNotes = ({ game, user }) => {
  const [note, setNote] = React.useState({
    text: '',
    image: ''
  });
  const [noteList, setNoteList] = useState([]);
  const themeColor = `${({ theme }) => theme.text}`;

  function handleChange(e) {
    setNote({...note, text: e.target.value });
  }

  function handlePhotoChange(e) {
    const reader = new FileReader();
    reader.onload = e => {
      console.log(e.target.result)
      setNote({ ...note, image: e.target.result })
    }
    reader.readAsDataURL(e.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault(); // Important
    const res = await fetch(`${API_URL}/games/notes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note, appid: game, userid: user._json.steamid }),
    });
    const json = await res.json();
    console.log(json.data)
    setNoteList(json.data); // Stretch - handle no response
    setNote({ text: "", image: "" }); // clears input field once the list is added
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
        <Label htmlFor="notes">
          Add a note: 
          <TextArea id="notes" rows="3" cols="50" type="text" value={note.text} onChange={handleChange} />
        </Label>
        {note.image && <img height="50px" width="80px" src={note.image} />}
        <Label htmlFor="photo_file">
          Add an image:
				  <InputPhoto type="file" name="photo_file" id="photo_file" onChange={handlePhotoChange} />
        </Label>
        <Input type="submit" value="Add" disabled={!note} />

      </Form>
      <Ul>
        {noteList.map((item) => {
          return (
            <NoteCont>
              <Li key={uuidv4()}>
                <Note>{item.text}</Note>
                {item.image && <Img src={item.image} />}
                <DeleteButton onClick={() => handleDelete(item)}>
                  X
                </DeleteButton>
                <SocialIcons>
                <FacebookShareButton style={{ margin: '8px' }} url={URL} quote="placeholder" hashtag="#placeholder"><FacebookIcon round={true} size={25} /></FacebookShareButton>
                <TwitterShareButton url={URL} quote="placeholder" hashtag="#placeholder"><TwitterIcon round={true} size={25} /></TwitterShareButton>
                {/* TODO: Once Backend is Hosted - Change URL for Socials to proper URL */}
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

const Img = styled.img`
  max-height: 300px;
  max-width: 500px;
  transition: 0.5s all linear;
  margin-top: 8px;
  &:hover {
    transform: scale(1.1);
    margin-left: 50px;
  }
`;

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
  position: relative;
  height: 30px;
  width: 50px;
  padding: 5px 5px;
  font-weight: 700;
  font-size: 12px;
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
  -webkit-transition: 0.10s ease-in;
  &:hover {
    color: ${({ theme }) => theme.body};
    border: 2px ${({ theme }) => theme.body};
    background-color: ${({ theme }) => theme.text};
    transition: all 250ms;
  }
`;

const InputPhoto = styled.input`
  margin-top: 5px;
  height: 30px;
  font-weight: 700;
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
  
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
  -webkit-transition: 0.10s ease-in;
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
