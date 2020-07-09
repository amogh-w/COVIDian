import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Radar } from "react-chartjs-2";
import useTheme from '@material-ui/core/styles/useTheme';
const data = {
  labels: ["sadness", "joy", "fear", "digust", "anger"],
  datasets: [
    {
      data: [0.21, 0.28, 0.07, 0.18, 0.15],
      backgroundColor: ["#173F5F", "#F6D55C", "#20639B", "#3CAEA3", "#ED553B"],
      hoverBackgroundColor: [
        "#173F5F",
        "#F6D55C",
        "#20639B",
        "#3CAEA3",
        "#ED553B",
      ],
    },
  ],
};

const data2 = {
  labels: ["sadness", "joy", "fear", "digust", "anger"],
  datasets: [
    {
      label: "Mumbai",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [23, 28, 7, 18, 16],
    },
    {
      label: "Delhi",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: [26, 28, 9, 19, 15],
    },
    {
      label: "Hyderabad",
      backgroundColor: "rgba(50, 210, 61,0.2)",
      borderColor: "rgba(50, 210, 61,1)",
      pointBackgroundColor: "rgba(50, 210, 61,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(50, 210, 61,1)",
      data: [18, 25, 7, 26, 16],
    },
    {
      label: "Chennai",
      backgroundColor: "rgba(5, 143, 255,0.2)",
      borderColor: "rgba(5, 143, 255,1)",
      pointBackgroundColor: "rgba(5, 143, 255,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(5, 143, 255,1)",
      data: [29, 21, 10, 15, 16],
    },
    {
      label: "Kolkata",
      backgroundColor: "rgba(255, 5, 247,0.2)",
      borderColor: "rgba(255, 5, 247,1)",
      pointBackgroundColor: "rgba(255, 5, 247,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 5, 247,1)",
      data: [22, 24, 10, 20, 16],
    },
  ],
};
// const options=

const DataCharts = ({ type }) => {
  const theme = useTheme()
  const [themeType,setTheme] = React.useState(theme.palette.type)
  React.useEffect(()=>{
    setTheme(theme.palette.type)
  },[theme.palette.type])
  if (type === "doughnut") {
    return (
      <div>
        <Doughnut data={data} options={{legend:{labels:{fontColor:themeType==='dark'?"rgb(255,255,255)":"rgb(0,0,0)"}}}} />
      </div>
    );
  } else if (type === "radar") {
    return (
      <div>
        <Radar  data={data2} options={{legend:{labels:{fontColor:themeType==='dark'?"rgb(255,255,255)":"rgb(0,0,0)"}}}} />
      </div>
    );
  }
};

export default React.memo(DataCharts);
