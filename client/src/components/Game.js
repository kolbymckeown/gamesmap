import React, { useEffect, useState  } from 'react'
import {
    useParams
} from "react-router-dom";


const API_URL = process.env.REACT_APP_API_URL
// const gameName = // split url on first / and second /


const Game = ({ user, userGames }) => {
    let  { name, id }  = useParams();
    const [news, setNews] = useState([])

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
                        <p>
                            {piece.url}
                            {/* TODO: Render contents with their proper tags */}
                        </p>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Game