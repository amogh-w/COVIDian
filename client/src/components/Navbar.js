import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@material-ui/core";

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography>Exercise Tracker</Typography>
        <Tabs>
          <Link to="/">
            <Tab label="Exercises" />
          </Link>
          <Link to="/create">
            <Tab label="Add Exercise" />
          </Link>
          <Link to="/user">
            <Tab label="Create User" />
          </Link>
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
