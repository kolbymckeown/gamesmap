import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "./styles/Colors";

const Header = ({ theme, setTheme }) => {
	const themeToggler = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};
	return (
		<Wrapper>
			<Nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/games">Games</NavLink>
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

const Button = styled.button`
	position: absolute;
	top: 15px;
	right: 15px;
	font-size: 15px;
`;
