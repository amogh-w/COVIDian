import React from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import DataCharts from "./DataCharts";
import Tweets from "./Tweets";
import State from "./State";

const StateInfo = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: "10px", height: "40vh" }}>
            <Typography>State Map Here</Typography>
          </Paper>
          <Paper style={{ marginTop: "10px", padding: "10px", height: "40vh" }}>
            <Typography>Charts Here</Typography>
          </Paper>
          <Paper style={{ marginTop: "10px", padding: "10px", height: "40vh" }}>
            <Typography>Tweets Here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default StateInfo;
