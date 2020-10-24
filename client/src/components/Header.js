import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "./styles/Colors";
const API_URL = process.env.REACT_APP_API_URL


const Header = ({ theme, setTheme, user }) => {
	const themeToggler = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};

	if (!user.displayName) {
		return (
			<Wrapper>
				{console.log(user)}
				<Nav>
					<NavLink to="/">Home</NavLink>
					<NavLink to="/games">Games</NavLink>
					<A href={API_URL + '/auth/steam'}>Login</A>
					<Button onClick={themeToggler}>
						{theme === "light" ? "Dark" : "Light"}
					</Button>
				</Nav>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			{console.log(user)}
			<Nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/games">Games</NavLink>
				<A href={API_URL + '/logout'}>Logout</A>
				<Button onClick={themeToggler}>
					{theme === "light" ? "Dark" : "Light"}
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
	background: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	transition: all 0.5s linear;
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
	color: ${({ theme }) => theme.text};
	&:hover {
		color: ${COLORS.REGULAR.TEAL};
	}
`;

const A = styled.a`
	text-decoration: none;
	display: flex;
	align-items: center;
	margin: 15px;
`

const Button = styled.button`
	position: absolute;
	top: 15px;
	right: 15px;
	font-size: 15px;
`;
