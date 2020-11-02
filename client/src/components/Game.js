import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const parse = require("html-react-parser");

const API_URL = process.env.REACT_APP_API_URL;
// const gameName = // split url on first / and second /

const Game = ({ user, userGames }) => {
	let { name, id } = useParams();
	const [news, setNews] = useState([]);
	const [show, setShow] = useState(false);

	// const toggleShow = (appid) => {
	// 	setShow((prevShow) => ({
	// 		...prevShow,
	// 		[appid]: !prevShow[appid],
	// 	}));
	// };

	const toggleShow = () => {
		setShow(!show);
	};

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
			.then((resp) => resp.json())
			.then((json) => {
				setNews(json.body);
			});
	}, [setNews]);

	return (
		<div>
			<p>
				{name} / {id}
			</p>
			{news.map((piece, index) => {
				const text = piece.contents;
				// const time = piece.date
				// const date = new Date(time)
				// const easyRead = date.toLocaleString()
				// All dates are showing year 1/19/1970 ?
				return (
					<div>
						<p>{piece.title}</p>
                        
						<a href={piece.url} target="_blank">
							{piece.url}
							{/* TODO: Render contents with their proper tags */}
						</a>
						<button onClick={() => toggleShow(index)}>Show News</button>
						{/* TODO: Toggle is only opening first News Piece, not the relative one */}
						<div style={{ display: show ? "flex" : "none" }}>{parse(text)}</div>
						{/* <FrameCont
							key={piece.appid}
							style={{ display: show ? "flex" : "none" }}
						>
							<IFrame src={piece.url} name="myIframe"></IFrame>
                            <button onClick={() => setShow(false)}>Exit</button>
						</FrameCont> */}
					</div>
				);
			})}
		</div>
	);
};

export default Game;

const FrameCont = styled.div``;

const IFrame = styled.iframe`
	position: fixed;
	top: 50%;
	left: 50%;
	/* bring your own prefixes */
	transform: translate(-50%, -50%);
	z-index: 1000;
	width: 80vw;
	height: 80vh;
`;
