import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import GlobalStyles from './components/styles/GlobalStyles'
import { lightTheme, darkTheme } from "./Themes";
import Header from './components/Header'
import Games from './components/Games'

function App() {
	const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/account", {
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
      setUser(json.user);
    })
  }, [setUser]);

  console.log(user);

  return (
    <Router>
			<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Header theme={theme} setTheme={setTheme} />
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <p>test</p>
        </Route>
        <Route path="/games">
          <Games />
        </Route>
      </Switch>
			</ThemeProvider>
    </Router>
  );
}

export default App;

const Wrapper = styled.div``;
