import React from "react";
import styled, { keyframes } from "styled-components";
// import { Carousel } from 'react-responsive-carousel';
import CarouselComponent from "./CarouselComponent";
import ReactPlayer from "react-player";

const DescriptionText =
	"Here at Gamesmap, we're an all in one stop for gamers. Jot down notes, watch your favorite streams, and even see recent news articles for your games! This is your all in one site to keep you focused on what matters!";

const twitchPurple = "#9146FF";

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: ${twitchPurple} }
  `;
const borderWidth = keyframes`
    from { opacity: 0 }
    to { opacity: 100% }
  `;

const bouncy = keyframes`
  0%{top:0em}
 40%{top:0em}
 43%{top:-0.9em}
 46%{top:0em}
 48%{top:-0.4em}
 50%{top:0em}
 100%{top:0em;}
`;

const Homepage = ({ user, userGames }) => {
	const [stream, setStream] = React.useState("");
	const [twitch, setTwitch] = React.useState(false);

	function handleChange(e) {
		setStream(e.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		setTwitch(stream);
	}

	if (!user.displayName) {
		return (
			<WrapperNotLoggedIn>
				<Outer>
					<Inner>
						<Title>Welcome to Gamesmap!</Title>
					</Inner>
				</Outer>
				<DescCont>
					<Description>{DescriptionText}</Description>
				</DescCont>
				<CarouselCont>
					<CarouselComponent />
				</CarouselCont>
			</WrapperNotLoggedIn>
		);
	}
	return (
		<Wrapper>
			<Intro>
				Hey {user.displayName}! <br />
				Feel free to hang out here and watch your favorite <br /> games played
				by your favorite streamers!
			</Intro>
			<VidCont style={{ marginTop: twitch && '75px' }}>
				<FormCont>
					<Form onSubmit={handleSubmit}>
						<Label>
							www.twitch.tv/
							<InputText type="text" value={stream} onChange={handleChange} />
						</Label>
						<Input type="submit" value="Play!" />
					</Form>
					<Example style={{ display: twitch && 'none'}}>
						Example: if the full url is 'twitch.tv/<strong>thestream</strong>',
						simply type in <strong>thestream</strong> and press play!
					</Example>
				</FormCont>
				{twitch ? (
					<ReactPlayer url={`twitch.tv/${twitch}`} controls />
				) : (
					<Type>Type in a stream above to load up the live feed!</Type>
				)}
			</VidCont>
		</Wrapper>
	);
};

export default Homepage;

const Wrapper = styled.div`
	text-align: center;
	color: ${twitchPurple};
`;

const Intro = styled.h1`
	font-size: 1.5vw;
	padding: 18px;
	text-align: center;
	color: ${({ theme }) => theme.text};
`;

const Outer = styled.div`
	position: fixed;
	left: 0;
	top: 80px;
`;
const Inner = styled.div`
	position: absolute;
	bottom: 100%;
	transform: rotateZ(90deg);
	transform-origin: 0 100%;
	white-space: nowrap;
`;

const WrapperNotLoggedIn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 15px;
`;

const FormCont = styled.div``;

const Example = styled.p`
	font-style: italic;
	font-size: 0.8em;
`;

const Type = styled.h2``;

const Form = styled.form`
	animation: ${borderWidth} 3s steps(40, end);
	margin-bottom: 15px;
`;

const Label = styled.label``;

const InputText = styled.input`
	border: none;
	border-bottom: 1px solid;
	background: unset;
	animation: ${blink} 1.75s step-end infinite;
	color: ${({ theme }) => theme.text};
	font-weight: bold;
	font-style: italic;
	&:focus {
		animation: unset;
		outline: none;
		border-color: ${twitchPurple};
		caret-color: ${twitchPurple};
	}
`;

const Input = styled.input`
	margin-left: 5px;
	font-weight: bold;
	height: 50px;
	width: 50px;
	position: absolute;
	border-radius: 50%;
	background: none;
	color: ${twitchPurple};
	border: 2px solid ${twitchPurple};
	position: relative;
	animation: ${bouncy} 4s infinite linear;
	outline: none;
	&:active {
		animation: none;
		transform: scale(0.85);
	}
`;

const VidCont = styled.div`

	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	// TODO: VidCont Style for smaller screens
	
`;

const CarouselCont = styled.div`
	margin-top: 15px;
`;

const Title = styled.h1`
	font-size: 3vw;
	transform: rotate(180deg);
`;

const DescCont = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 45px;
`;

const Description = styled.h2`
	text-align: justify;
	flex: 1;
	max-width: 40%;
`;

// const RemoteImg = styled.img`
//   flex: 1;
//   max-height: 300px;
//   max-width: 150px;
//   border-top-left-radius: 30px;
//   border-bottom-right-radius: 30px;
//   transform: 0.8s ease-out;
//   &:hover {
//   animation-name: ${rotateImg};
//   animation-duration: 5s;
//   animation-iteration-count: infinite;
//   }
// `;
