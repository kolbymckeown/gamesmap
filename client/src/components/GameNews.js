import React, { useState } from "react";
import styled from "styled-components";

const parse = require("html-react-parser");

const GameNews = ({ piece }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const regex = /\[img\].*\[\/img\]/g
  const regex2 = /<img>.*<\/img>/g

  const text = piece.contents;
  const url = text.replaceAll('[url', '<a href')
  const youtube = url.replaceAll('[prev', ' <!-- ')
  const youtubeClose = youtube.replaceAll('view]', ' --> ')
  const closeUrl = youtubeClose.replaceAll('[/url]', '</a>')
  const img = closeUrl.replaceAll('<img>', ' <!-- ')
  const closeImg = img.replaceAll('</img>', ' --> ')
  const replaced = closeImg.replaceAll(']','>')
  const output = replaced.replaceAll('[', '<')
    // TODO: https://www.npmjs.com/package/bbcode-to-react
  let finalText = output.replaceAll(regex, '')
  finalText = finalText.replaceAll(regex2, '')
  // console.log(text)

  return (

    <Wrapper>
      <Title>{piece.title}</Title>
      <Container>
        <Link href={piece.url} target="_blank" rel="noopener noreferrer">
          {piece.url}
        </Link>
        <Button onClick={toggleShow}>{show ? "↑" : `↓`}</Button>
      </Container>
      <Info style={{ display: show ? "flex" : "none" }}>{parse(finalText)}</Info>
    </Wrapper>
  );
};

export default GameNews;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-right: 3px solid ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80%;
`;

const Link = styled.a`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.text};
  font-style: italic;
`;

const Button = styled.button`
  max-width: 100px;
  font-size: 22px;
  font-weight: bold;
  background: none;
  border: none;
  position: absolute; // More margin between each
  right: 0;
  color: ${({ theme }) => theme.text};
  &:active {
    outline: none;
  }
`;

const Info = styled.div`
  font-size: 0.8rem;
  flex-direction: column;
  align-items: center;
  max-width: 50vw;
  max-height: 400px;
  overflow: auto;
`;
