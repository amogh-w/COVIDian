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
  const [lineData,setLineData] = React.useState([])

  const lineGraphData = React.useMemo(()=>({
    labels:lineData[0],
    datasets:lineData[1]
  }),[lineData])

  React.useEffect(()=>{
    const fetch = createApolloFetch({
      uri: `/graphql`,
    });
    (async ()=>{
      const data =await fetch({
        query:`{ latestSentiments { date anger happiness neutral sadness worry } }`
      })
      console.log(data)
      const dateArr = []

      const sentimentArr = [
        {label:'Anger',data:[],fill:false,borderColor:"rgba(179,181,198,0.2)",backgroundColor:"rgba(179,181,198,1)"},
        {label:'Happiness',data:[],fill:false,borderColor:"rgba(255,99,132,0.2)",backgroundColor:"rgba(255,99,132,1)"},
        {label:'Neutral',data:[],fill:false,borderColor:"rgba(50, 210, 61,0.2)",backgroundColor:"rgba(50, 210, 61,1)"},
        {label:'Sadness',data:[],fill:false,borderColor:"rgba(5, 143, 255,0.2)",backgroundColor:"rgba(5, 143, 255,1)"},
        {label:'Worry',data:[],fill:false,borderColor:"rgba(255, 5, 247,0.2)",backgroundColor:"rgba(255, 5, 247,1)"}
      ]

      data.data.latestSentiments.forEach(dateObj=>{
        dateArr.push(dateObj.date)
        sentimentArr[0].data.push(dateObj.anger)
        sentimentArr[1].data.push(dateObj.happiness)
        sentimentArr[2].data.push(dateObj.neutral)
        sentimentArr[3].data.push(dateObj.sadness)
        sentimentArr[4].data.push(dateObj.worry)
      })

      setLineData(dateArr,sentimentArr)
    })()
  },[])
  
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
        <Line data={lineGraphData} />
      </Paper>
      <Paper style={{ marginTop: "10px", padding: "10px" }}>
        <Tweets changeLoadingStatus={setTweetLoadingStatus} />
      </Paper>
    </div>
  );
};

export default CountryInfo;
