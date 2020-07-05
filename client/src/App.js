import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CountryInfo from "./components/CountryInfo";
import StateInfo from "./components/StateInfo";
import LiveTweet from "./components/LiveTweet";
import Resources from "./components/Resources";
import About from "./components/About";
import CssBaseline from "@material-ui/core/CssBaseline";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";

const App = () => {
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar darkState={darkState} handleThemeChange={handleThemeChange} />
        <Container>
          <div style={{ padding: "10px", marginTop: "80px" }}>
            <Route path="/" exact component={CountryInfo} />
            <Route path="/state/:name" component={StateInfo} />
            <Route path="/analyzer" component={LiveTweet} />
            <Route path="/resources" component={Resources} />
            <Route path="/about" component={About} />
          </div>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
