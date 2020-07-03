import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@material-ui/core";

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography>Covid Tweet Sentiment Analyzer</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
