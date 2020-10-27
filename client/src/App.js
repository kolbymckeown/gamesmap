import React, { useEffect, useState } from 'react';
// import styled from 'styled-components'
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import GlobalStyles from './components/styles/GlobalStyles'
import { lightTheme, darkTheme } from "./Themes";
import Header from './components/Header'
import Games from './components/Games'
import Homepage from './components/Homepage'

const API_URL = process.env.REACT_APP_API_URL

function App() {
	const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({});
  const [userGames, setUserGames] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/account`, {
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
        // console.log(json.body) // Game List
      setUser(json.user);
      setUserGames(json.body)
      // localStorage.setItem('Games', userGames.games)

    })
  }, [setUser]);


  console.log(user);
  console.log(userGames)

  return (
    <Router>
			<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Header theme={theme} setTheme={setTheme} user={user} />
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Homepage user={user} />
        </Route>
        <Route path="/games">
          <Games user={user} userGames={userGames.games} />
        </Route>
      </Switch>
			</ThemeProvider>
    </Router>
  );
}

export default App;

// const Wrapper = styled.div``;
