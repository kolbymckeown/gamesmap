import React, { useState } from "react";
import styled from "styled-components";

const parse = require("html-react-parser");

const GameNews = ({ piece }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const regex = /\[img\].*\[\/img\]/g;
  const regex2 = /<img>.*<\/img>/g;
  // This is needed to properly parse the News Text as parts of it come in as BBCode
  const text = piece.contents;
  const url = text.replaceAll("[url", "<a href");
  const youtube = url.replaceAll("[prev", " <!-- ");
  const youtubeClose = youtube.replaceAll("view]", " --> ");
  const closeUrl = youtubeClose.replaceAll("[/url]", "</a>");
  const img = closeUrl.replaceAll("<img>", " <!-- ");
  const closeImg = img.replaceAll("</img>", " --> ");
  const replaced = closeImg.replaceAll("]", ">");
  const output = replaced.replaceAll("[", "<");
  let finalText = output.replaceAll(regex, "");
  finalText = finalText.replaceAll(regex2, "");

  return (
    <Wrapper>
      <Title>{piece.title}</Title>
      <Button onClick={toggleShow}>{show ? "\u25B2" : "\u25BC"} </Button>
      <Info style={{ display: show ? "flex" : "none" }}>
        <Link href={piece.url} target="_blank" rel="noopener noreferrer">
          Click Here For The Full Story!
        </Link>
        {parse(finalText)}
      </Info>
    </Wrapper>
  );
};

export default GameNews;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 18px 8px;
  
`;

const Title = styled.h1`
  font-size: 20px;
  max-width: 80%;
`;

const Link = styled.a`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  margin-bottom: 8px;
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
  font-size: 0.9rem;
  flex-direction: column;
  align-items: center;
  max-width: 45vw;
  max-height: 400px;
  overflow: auto;

  img {
    max-width: 500px;
  }

  a {
    color: inherit;
  }
`;
