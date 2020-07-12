import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import DataCharts from "./DataCharts";
import Tweets from "./Tweets";
import Map from "./Map";
import Loader from "./spinnerScreen";
import { Line } from "react-chartjs-2";

const CountryInfo = () => {
  const [isMapLoaded, setMapLoadingStatus] = React.useState(false);
  const [isTweetLoaded, setTweetLoadingStatus] = React.useState(false);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  

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
        <Line data={data} />
      </Paper>
      <Paper style={{ marginTop: "10px", padding: "10px" }}>
        <Tweets changeLoadingStatus={setTweetLoadingStatus} />
      </Paper>
    </div>
  );
};

export default CountryInfo;
