import React from "react";
import { Grid, Paper, Divider } from "@material-ui/core";
import DataCharts from "./DataCharts";
import Tweets from "./Tweets";
import Map from "./Map";

const CountryInfo = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: "10px" }}>
            <DataCharts type="doughnut" />
            <Divider style={{ margin: "35px 0px" }} />
            <DataCharts type="radar" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: "10px" }}>
            <Map />
          </Paper>
        </Grid>
      </Grid>
      <Paper style={{ marginTop: "10px", padding: "10px" }}>
        <Tweets />
      </Paper>
    </div>
  );
};

export default CountryInfo;
