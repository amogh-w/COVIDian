import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tweets from "./Tweets";
import State from "./State";
import { Radar } from "react-chartjs-2";
import { createApolloFetch } from "apollo-fetch";
import Loader from "./spinnerScreen";

const StateInfo = (props) => {
  const angerList = React.useRef([]);
  const happinessList = React.useRef([]);
  const neutralList = React.useRef([]);
  const sadnessList = React.useRef([]);
  const worryList = React.useRef([]);
  const [dataList, setDataList] = React.useState([]);

  React.useEffect(() => {
    const fetch = createApolloFetch({
      uri: `/graphql`,
    });

    fetch({
      query: `{
        sentiments(state: "${props.match.params.name}") {
        id
        date_time
        tweet
        link
        state
        city
        anger
        happiness
        neutral
        sadness
        worry
        }
       }`,
    })
      .then((res) => {
        res.data.sentiments.map((sentiment) => {
          angerList.current.push(sentiment.anger);
          happinessList.current.push(sentiment.happiness);
          neutralList.current.push(sentiment.neutral);
          sadnessList.current.push(sentiment.sadness);
          worryList.current.push(sentiment.worry);
          return null;
        });
      })
      .then(() => {
        let tempDataList = [];
        let sum = angerList.current.reduce((a, b) => a + b, 0);
        let avg = sum / angerList.current.length || 0;
        tempDataList.push(avg.toFixed(2) * 100);
        sum = happinessList.current.reduce((a, b) => a + b, 0);
        avg = sum / happinessList.current.length || 0;
        tempDataList.push(avg.toFixed(2) * 100);
        sum = neutralList.current.reduce((a, b) => a + b, 0);
        avg = sum / neutralList.current.length || 0;
        tempDataList.push(avg.toFixed(2) * 100);
        sum = sadnessList.current.reduce((a, b) => a + b, 0);
        avg = sum / sadnessList.current.length || 0;
        tempDataList.push(avg.toFixed(2) * 100);
        sum = worryList.current.reduce((a, b) => a + b, 0);
        avg = sum / worryList.current.length || 0;
        tempDataList.push(avg.toFixed(2) * 100);
        setDataList(tempDataList);
      });
  }, [props.match.params.name]);

  // useEffect(() => {
  //   console.log(dataList);
  // }, [dataList]);

  // console.log(props.match.params.name);

  const dataToChart = {
    labels: ["anger", "happiness", "neutral", "sadness", "worry"],
    datasets: [
      {
        label: props.match.params.name,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
        data: dataList,
      },
    ],
  };

  return (
    <div>
      <Loader loading={!dataList.length} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: "10px" }}>
            <State selectedState={props.match.params.name} />
          </Paper>
          <Paper style={{ marginTop: "10px", padding: "10px" }}>
            {true ? (
              <Radar data={dataToChart} redraw key={Math.random()} />
            ) : (
              <p>Loading...</p>
            )}
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
