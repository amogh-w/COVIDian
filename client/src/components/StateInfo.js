import React, { useEffect, useState, useRef } from "react";
import { Grid, Paper } from "@material-ui/core";
import Tweets from "./Tweets";
import State from "./State";
import { Radar } from "react-chartjs-2";
import { createApolloFetch } from "apollo-fetch";

const StateInfo = (props) => {
  const sadnessList = useRef([]);
  const joyList = useRef([]);
  const fearList = useRef([]);
  const disgustList = useRef([]);
  const angerList = useRef([]);

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetch = createApolloFetch({
      uri: "http://localhost:5000/graphql",
    });

    fetch({
      query: `{ sentiments(state: "${props.match.params.name}") { tweet link state city sadness joy fear disgust anger }}`,
    })
      .then((res) => {
        res.data.sentiments.map((sentiment) => {
          sadnessList.current.push(sentiment.sadness);
          joyList.current.push(sentiment.joy);
          fearList.current.push(sentiment.fear);
          disgustList.current.push(sentiment.disgust);
          angerList.current.push(sentiment.anger);
          return null;
        });
      })
      .then(() => {
        let tempDataList = [];
        let sum = sadnessList.current.reduce((a, b) => a + b, 0);
        let avg = sum / sadnessList.current.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);
        sum = joyList.current.reduce((a, b) => a + b, 0);
        avg = sum / joyList.current.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);
        sum = fearList.current.reduce((a, b) => a + b, 0);
        avg = sum / fearList.current.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);
        sum = disgustList.current.reduce((a, b) => a + b, 0);
        avg = sum / disgustList.current.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);
        sum = angerList.current.reduce((a, b) => a + b, 0);
        avg = sum / angerList.current.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);

        setDataList(tempDataList);
      });
  }, [props.match.params.name]);

  // useEffect(() => {
  //   console.log(dataList);
  // }, [dataList]);

  // console.log(props.match.params.name);

  const dataToChart = {
    labels: ["sadness", "joy", "fear", "digust", "anger"],
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
