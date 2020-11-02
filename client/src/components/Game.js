import React, { useEffect, useState  } from 'react'
import {
    useParams
} from "react-router-dom";
import styled from 'styled-components'


const API_URL = process.env.REACT_APP_API_URL
// const gameName = // split url on first / and second /


const Game = ({ user, userGames }) => {
    let  { name, id }  = useParams();
    const [news, setNews] = useState([])
    const [show, setShow] = useState(false)

    const toggleShow = (appid) => {
        setShow(prevShow => ({
            ...prevShow,
            [appid]: !prevShow[appid]
        }))
    }

    useEffect(() => {
        fetch(`${API_URL}/game/${name}/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
          .then(resp => resp.json())
          .then(json => {
              setNews(json.body)
          })
      }, [setNews]);
      console.log(news)

    return (
        <div>
            <p>
                {name} / {id}
            </p>
            {news.map((piece) => {
                // const time = piece.date
                // const date = new Date(time)
                // const easyRead = date.toLocaleString()
                // All dates are showing year 1/19/1970 ?
                return (
                    <div>
                        <p>
                            {piece.title}
                        </p>
                        <a href={piece.url}>
                            {piece.url}
                            {/* TODO: Render contents with their proper tags */}
                        </a>
                        <button onClick={() => toggleShow(piece.appid)}>Show News</button>
                        <FrameCont  key={piece.appid} style={{ display: show ? 'flex' : 'none' }}>
                        <IFrame src={piece.url} name="myIframe"></IFrame>
                        </FrameCont>
                    </div>
                )
            })}
        </div>
    )
}

export default Game

const FrameCont = styled.div`

`; 

const IFrame = styled.iframe`
    position: fixed;
    top: 50%;
    left: 50%;
  /* bring your own prefixes */
    transform: translate(-50%, -50%);
    z-index: 1000;
`;