import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Tweets from "./Tweets";
import State from "./State";
import { Radar } from "react-chartjs-2";
import { createApolloFetch } from "apollo-fetch";

const StateInfo = (props) => {
  let sadnessList = [];
  let joyList = [];
  let fearList = [];
  let disgustList = [];
  let angerList = [];

  // const [sadnessList, setSadnessList] = useState([]);
  // const [joyList, setJoyList] = useState([]);
  // const [fearList, setFearList] = useState([]);
  // const [disgustList, setDisgustList] = useState([]);
  // const [angerList, setAngerList] = useState([]);
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
          sadnessList.push(sentiment.sadness);
          joyList.push(sentiment.joy);
          fearList.push(sentiment.fear);
          disgustList.push(sentiment.disgust);
          angerList.push(sentiment.anger);
          return null;
        });
      })
      .then(() => {
        let tempDataList = [];
        let sum = sadnessList.reduce((a, b) => a + b, 0);
        let avg = sum / sadnessList.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);
        sum = joyList.reduce((a, b) => a + b, 0);
        avg = sum / joyList.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);
        sum = fearList.reduce((a, b) => a + b, 0);
        avg = sum / fearList.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);
        sum = disgustList.reduce((a, b) => a + b, 0);
        avg = sum / disgustList.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);
        sum = angerList.reduce((a, b) => a + b, 0);
        avg = sum / angerList.length || 0;
        // setDataList(...dataList, avg);
        tempDataList.push(avg.toFixed(2) * 100);

        setDataList(tempDataList);
      });
  }, []);

  useEffect(() => {
    console.log(dataList);
  }, [dataList]);

  console.log(props.match.params.name);

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
