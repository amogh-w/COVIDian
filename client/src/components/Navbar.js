import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

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
