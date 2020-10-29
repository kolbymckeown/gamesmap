import React from "react";
import styled from "styled-components";

const Modal = ({ game }) => {
	const [note, setNote] = React.useState("");
	// TODO: setNote to array of notes (push the note each time submit is hit)
	// map over each note to render a <UL> of <LI>

	function handleChange(e) {
		setNote(e.target.value);
	}

	return (
		<Cont>
			<Wrapper>
				<Header>
					<Title>{game.name}</Title>
					<Time>
						Hours spent grinding away: {(game.playtime_forever / 60).toFixed(2)}
						!
					</Time>
				</Header>
				<Img
					src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`}
					alt={`${game.name} Logo`}
				/>

				<Form>
					<Label>
						Add a note:
						<Input type="text" value={note} onChange={handleChange} />
					</Label>
					<Input type="submit" value="Add" />
					{/* TODO: "Add" creates a LI up to max of 5 (paginate if more?) */}
				</Form>
				<ul>
					<li>{note}</li>
				</ul>
			</Wrapper>
			{console.log(note)}
		</Cont>
	);
};

export default Modal;

const Cont = styled.div`
	background-color: ${({ theme }) => theme.text};
	padding: 25px;
	border-radius: 5px;
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

const Time = styled.p`
	font-style: italic;
	font-size: 14px;
	text-align: left;
`;

const P = styled.p``;

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
