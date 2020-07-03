import React from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import DataCharts from "./DataCharts";
import Tweets from "./Tweets";
import State from "./State";

const StateInfo = (props) => {
  console.log(props.match.params.name);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: "10px" }}>
            <State selectedState={props.match.params.name} />
          </Paper>
          <Paper style={{ marginTop: "10px", padding: "10px" }}>
            <Typography>Charts Here</Typography>
            <DataCharts type="radar" />
          </Paper>
          <Paper style={{ marginTop: "10px", padding: "10px" }}>
            <Tweets selectedState={props.match.params.name} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default StateInfo;
