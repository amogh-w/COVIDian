import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import DataCharts from "./DataCharts";
import Tweets from "./Tweets";
import Map from "./Map";
import Loader from "./spinnerScreen";
import { Line } from "react-chartjs-2";
import { createApolloFetch } from "apollo-fetch";

const CountryInfo = () => {
  const [isMapLoaded, setMapLoadingStatus] = React.useState(false);
  const [isTweetLoaded, setTweetLoadingStatus] = React.useState(false);
  const [lineData, setLineData] = React.useState([]);

  const lineGraphData = React.useMemo(
    () => ({
      labels: lineData[0],
      datasets: lineData[1],
    }),
    [lineData]
  );

  React.useEffect(() => {
    const fetch = createApolloFetch({
      uri: `/graphql`,
    });
    (async () => {
      const data = await fetch({
        query: `{ latestSentiments { date anger happiness neutral sadness worry } }`,
      });
      console.log(data);
      const dateArr = [];

      const sentimentArr = [
        {
          label: "Anger",
          data: [],
          fill: false,
          borderColor: "rgba(237, 85, 59, 0.2)",
          backgroundColor: "rgba(237, 85, 59, 1)",
        },
        {
          label: "Happiness",
          data: [],
          fill: false,
          borderColor: "rgba(246, 213, 92, 0.2)",
          backgroundColor: "rgba(246, 213, 92, 1)",
        },
        {
          label: "Neutral",
          data: [],
          fill: false,
          borderColor: "rgba(60, 174, 163, 0.2)",
          backgroundColor: "rgba(60, 174, 163, 1)",
        },
        {
          label: "Sadness",
          data: [],
          fill: false,
          borderColor: "rgba(23, 63, 95, 0.2)",
          backgroundColor: "rgba(23, 63, 95, 1)",
        },
        {
          label: "Worry",
          data: [],
          fill: false,
          borderColor: "rgba(32, 99, 155, 0.2)",
          backgroundColor: "rgba(32, 99, 155, 1)",
        },
      ];

      data.data.latestSentiments.forEach((dateObj) => {
        dateArr.push(dateObj.date);
        sentimentArr[0].data.push((dateObj.anger * 100).toFixed());
        sentimentArr[1].data.push((dateObj.happiness * 100).toFixed());
        sentimentArr[2].data.push((dateObj.neutral * 100).toFixed());
        sentimentArr[3].data.push((dateObj.sadness * 100).toFixed());
        sentimentArr[4].data.push((dateObj.worry * 100).toFixed());
      });

      setLineData([dateArr, sentimentArr]);
    })();
  }, []);

  console.log(lineGraphData);

  return (
    <div>
      <Loader loading={!isMapLoaded && !isTweetLoaded} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: "10px" }}>
            <DataCharts type="doughnut" />
            <Divider style={{ marginTop: "35px", marginBottom: "10px" }} />
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
        <Line
          options={{ title: { display: true, text: "Sentiment Timeline" } }}
          data={lineGraphData}
        />
      </Paper>
      <Paper style={{ marginTop: "10px", padding: "10px" }}>
        <Tweets changeLoadingStatus={setTweetLoadingStatus} />
      </Paper>
    </div>
  );
};

export default CountryInfo;
