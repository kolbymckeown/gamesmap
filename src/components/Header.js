import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { COLORS } from "./styles/Colors";
const API_URL = process.env.REACT_APP_API_URL


const Header = ({ theme, setTheme, user }) => {
	const themeToggler = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
		localStorage.setItem('theme', theme)
		// Saves Users Dark or Light Mode preference
	};

	React.useEffect(() => {
		const toggler = localStorage.getItem('theme')
		if (toggler === 'dark') {
			setTheme('light')
		} else {
			setTheme('dark')
		}
	})

	if (!user.displayName) {
		return (
			<Wrapper>
				<Nav>
					<NavLink to="/">HOME</NavLink>
					{/* <NavLink to="/games">Games</NavLink> */}
					<A href={API_URL + '/auth/steam'}>LOGIN</A>
					<Button onClick={themeToggler}>
						{theme === "light" ? "DARK" : "LIGHT"}
					</Button>
				</Nav>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			
			<Nav>
				<NavLink to="/">HOME</NavLink>
				<NavLink to="/games">GAMES</NavLink>
				<A href={API_URL + '/logout'}>LOGOUT</A>
				<Button onClick={themeToggler}>
					{theme === "light" ? "DARK" : "LIGHT"}
				</Button>
			</Nav>
		</Wrapper>
	);
};

export default Header;

const Wrapper = styled.div`
	padding-bottom: 5px;
	position: sticky;
	top: 0;
	z-index: 100;
	background: ${({ theme }) => theme.text};
	color: ${({ theme }) => theme.body};
	transition: all 0.5s linear;
	letter-spacing: 2px;
`;

const Nav = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: center;
	font-size: 15px;
	max-height: 45px;
`;

const NavLink = styled(Link)`
	justify-content: space-around;
	margin: 15px;
	text-decoration: none;
	color: ${({ theme }) => theme.body};	
`;

const A = styled.a`
	text-decoration: none;
	display: flex;
	align-items: center;
	margin: 15px;
	color: ${({ theme }) => theme.body};	
`

const Button = styled.button`
	position: absolute;
	top: 15px;
	right: 15px;
	font-size: 15px;
	border: none;
	background: none;
	color: ${({ theme }) => theme.body};
	letter-spacing: 3px;
	outline: none;
	
`;
