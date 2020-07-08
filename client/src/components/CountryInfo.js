import React,{useState} from "react";
import { Grid, Paper, Divider } from "@material-ui/core";
import DataCharts from "./DataCharts";
import Tweets from "./Tweets";
import Map from "./Map";
import Loader from './spinnerScreen'
const CountryInfo = () => {
  const [isMapLoaded,setMapLoadingStatus] = useState(false)
  const [isTweetLoaded,setTweetLoadingStatus] = useState(false)

  
  // useEffect(()=>{
  //   console.log(isMapLoaded,isTweetLoaded)
  // },[isMapLoaded,isTweetLoaded])

  

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
