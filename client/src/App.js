import React from "react";
import { Container, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CountryInfo from "./components/CountryInfo";
import StateInfo from "./components/StateInfo";
import LiveTweet from "./components/LiveTweet";
import Resources from "./components/Resources";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <div style={{ padding: "10px", marginTop: "80px" }}>
          <Route path="/" exact component={CountryInfo} />
          <Route path="/state/:name" component={StateInfo} />
          <Route path="/analyzer" component={LiveTweet} />
          <Route path="/resources" component={Resources} />
          <Route path="/about" component={About} />
        </div>
      </Container>
    </Router>
  );
};

export default App;
