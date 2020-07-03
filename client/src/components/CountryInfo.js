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
          <Paper style={{ padding: "10px", height: "85vh" }}>
            <Typography>Charts Here</Typography>
            <DataCharts type="doughnut" />
            <DataCharts type="radar" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: "10px", height: "85vh" }}>
            <Map />
          </Paper>
        </Grid>
      </Grid>
      <Paper style={{ marginTop: "10px", padding: "10px" }}>
        <Typography>Tweets Here</Typography>
        <Tweets />
      </Paper>
    </div>
  );
};

export default CountryInfo;
