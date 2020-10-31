import React from 'react'
import {
    useParams
  } from "react-router-dom";

const Game = ({ user, userGames }) => {
    let  { name, id }  = useParams();
    return (
            <p>
                {name} / {id}
            </p>
    )
}

export default Game