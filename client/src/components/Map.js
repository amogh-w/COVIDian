import React, { useState, useEffect, useCallback } from "react";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { useHistory } from "react-router-dom";
import { createApolloFetch } from "apollo-fetch";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const INDIA_TOPO_JSON =
  "https://raw.githubusercontent.com/varunon9/india-choropleth-javascript/master/src/india.topo.json";

const PROJECTION_CONFIG = {
  scale: 1600,
  center: [82.0, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
// const COLOR_RANGE = [
//   "#ffedea",
//   "#ffcec5",
//   "#ffad9f",
//   "#ff8a75",
//   "#ff5533",
//   "#e2492d",
//   "#be3d26",
//   "#9a311f",
//   "#782618",
// ];

const COLOR_RANGE_ANGER = [
  "#f39281",
  "#f17e6a",
  "#ef6952",
  "#ed553b",
  "#eb4124",
  "#e2492d",
  "#be3d26",
];

const COLOR_RANGE_SADNESS = [
  "#26689d",
  "#215a88",
  "#1c4d74",
  "#173f5f",
  "#12314a",
  "#0d2436",
  "#081621",
];

const COLOR_RANGE_JOY = [
  "#fae8a4",
  "#f9e18c",
  "#f7db74",
  "#f6d55c",
  "#f5cf44",
  "#f3c92c",
  "#f2c214",
];

const COLOR_RANGE_FEAR = [
  "#338bd5",
  "#297ec5",
  "#2471b0",
  "#20639b",
  "#1c5686",
  "#174871",
  "#133b5c",
];

const COLOR_RANGE_DISGUST = [
  "#6bccc2",
  "#58c5bb",
  "#45bfb3",
  "#3caea3",
  "#359b91",
  "#2f887f",
  "#28756e",
];

const DEFAULT_COLOR = "#CDCDCD";

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

// will generate random heatmap data on every call
const getHeatMapData = () => {
  return [
    { id: "AP", state: "Andhra Pradesh", value: getRandomInt() },
    { id: "AR", state: "Arunachal Pradesh", value: getRandomInt() },
    { id: "AS", state: "Assam", value: getRandomInt() },
    { id: "BR", state: "Bihar", value: getRandomInt() },
    { id: "CT", state: "Chhattisgarh", value: getRandomInt() },
    { id: "GA", state: "Goa", value: 21 },
    { id: "GJ", state: "Gujarat", value: 22 },
    { id: "HR", state: "Haryana", value: getRandomInt() },
    { id: "HP", state: "Himachal Pradesh", value: 24 },
    { id: "JH", state: "Jharkhand", value: 26 },
    { id: "KA", state: "Karnataka", value: 27 },
    { id: "KL", state: "Kerala", value: getRandomInt() },
    { id: "MP", state: "Madhya Pradesh", value: getRandomInt() },
    { id: "MH", state: "Maharashtra", value: getRandomInt() },
    { id: "MN", state: "Manipur", value: getRandomInt() },
    { id: "ML", state: "Meghalaya", value: 59 },
    { id: "MZ", state: "Mizoram", value: getRandomInt() },
    { id: "NL", state: "Nagaland", value: 59 },
    { id: "OR", state: "Odisha", value: 59 },
    { id: "PB", state: "Punjab", value: getRandomInt() },
    { id: "RJ", state: "Rajasthan", value: getRandomInt() },
    { id: "SK", state: "Sikkim", value: getRandomInt() },
    { id: "TN", state: "Tamil Nadu", value: getRandomInt() },
    { id: "TG", state: "Telangana", value: getRandomInt() },
    { id: "TR", state: "Tripura", value: 14 },
    { id: "UT", state: "Uttarakhand", value: getRandomInt() },
    { id: "UP", state: "Uttar Pradesh", value: 15 },
    { id: "WB", state: "West Bengal", value: 17 },
    { id: "WB", state: "West Bengal", value: 17 },
    { id: "AN", state: "Andaman and Nicobar Islands", value: getRandomInt() },
    { id: "CH", state: "Chandigarh", value: getRandomInt() },
    { id: "DN", state: "Dadra and Nagar Haveli", value: 19 },
    { id: "DD", state: "Daman and Diu", value: 20 },
    { id: "DL", state: "Delhi", value: 59 },
    { id: "JK", state: "Jammu and Kashmir", value: 25 },
    { id: "LA", state: "Ladakh", value: getRandomInt() },
    { id: "LD", state: "Lakshadweep", value: getRandomInt() },
    { id: "PY", state: "Puducherry", value: getRandomInt() },
  ];
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
// const LinearGradient = (props) => {
//   const { data } = props;
//   const boxStyle = {
//     width: 180,
//     margin: "auto",
//   };
//   const gradientStyle = {
//     backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
//     height: 20,
//   };
//   return (
//     <div>
//       <div style={boxStyle} className="display-flex">
//         <span>{data.min}</span>
//         <span className="fill"></span>
//         <span>{data.max}</span>
//       </div>
//       <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
//     </div>
//   );
// };

const Map = ({changeLoadingStatus}) => {
  let history = useHistory();

  const [tooltipContent, setTooltipContent] = useState("");
  const [data, setData] = useState(getHeatMapData());
  const [attribute, setAttribute] = useState("anger");
  const [colorRange, setColorRange] = useState(COLOR_RANGE_ANGER);

  useEffect(() => {
    const fetch = createApolloFetch({
      uri: `http://localhost:5001/graphql`,
    });

    fetch({
      query:
        "{  sentimentsState {    id    key    state    sadness    joy    fear    disgust    anger  }}",
    }).then((res) => {
      // console.log(res.data.sentimentsState, attribute);
      setData(res.data.sentimentsState);
      changeLoadingStatus(true)  

    });
  }, [changeLoadingStatus]);

  const handleChange = (event) => {
    setAttribute(event.target.value);
    console.log("HEY", event.target.value);
    if (event.target.value === "anger") {
      setColorRange(COLOR_RANGE_ANGER);
    } else if (event.target.value === "sadness") {
      setColorRange(COLOR_RANGE_SADNESS);
    } else if (event.target.value === "joy") {
      setColorRange(COLOR_RANGE_JOY);
    } else if (event.target.value === "fear") {
      setColorRange(COLOR_RANGE_FEAR);
    } else if (event.target.value === "disgust") {
      setColorRange(COLOR_RANGE_DISGUST);
    }
  };

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d[attribute]))
    .range(colorRange);

  const onMouseEnter = useCallback(
    (geo, current) => {
      return () => {
        setTooltipContent(
          `${geo.properties.name}: ${
            current ? (current[attribute] * 100).toFixed(2) + "%" : "NA"
          }`
        );
      };
    },
    [attribute]
  );

  const onMouseLeave = useCallback(() => {
    setTooltipContent("");
  }, []);

  const classes = useStyles();
  return (
    <div>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={1000}
        height={1000}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              //console.log(geo.id);
              const current = data.find((s) => s.key === geo.id);
              // console.log(current,attribute)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    current ? colorScale(current[attribute]) : DEFAULT_COLOR
                  }
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                  onClick={() => {
                    console.log(geo.properties.name);
                    history.push({
                      pathname: `/state/${geo.properties.name}`,
                    });
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Emotion</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={attribute}
          onChange={handleChange}
        >
          <MenuItem value={"anger"}>Anger</MenuItem>
          <MenuItem value={"sadness"}>Sadness</MenuItem>
          <MenuItem value={"joy"}>Joy</MenuItem>
          <MenuItem value={"fear"}>Fear</MenuItem>
          <MenuItem value={"disgust"}>Disgust</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Map;
