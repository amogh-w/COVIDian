import React from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import DataCharts from "./DataCharts";
import Tweets from "./Tweets";
import Map from "./Map";

const CountryInfo = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: "10px", height: "40vh" }}>
            <Typography>Charts Here</Typography>
          </Paper>
          <Paper style={{ marginTop: "10px", padding: "10px", height: "40vh" }}>
            <Typography>Tweets Here</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: "10px", height: "83.6vh" }}>
            <Map />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CountryInfo;
