import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import DataCharts from "./DataCharts";
import Tweets from "./Tweets";
import Map from "./Map";
import Loader from "./spinnerScreen";

const CountryInfo = () => {
  const [isMapLoaded, setMapLoadingStatus] = React.useState(false);
  const [isTweetLoaded, setTweetLoadingStatus] = React.useState(false);

  return (
    <div>
      <Loader loading={!isMapLoaded && !isTweetLoaded} />
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
            <Map changeLoadingStatus={setMapLoadingStatus} />
          </Paper>
        </Grid>
      </Grid>
      <Paper style={{ marginTop: "10px", padding: "10px" }}>
        <Tweets changeLoadingStatus={setTweetLoadingStatus} />
      </Paper>
    </div>
  );
};

export default CountryInfo;
