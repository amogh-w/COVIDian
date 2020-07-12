import React from "react";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { useHistory } from "react-router-dom";
import { createApolloFetch } from "apollo-fetch";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import IndiaMap from "../topojsons/india.topo.json";

const INDIA_TOPO_JSON = IndiaMap;

const PROJECTION_CONFIG = {
  scale: 1600,
  center: [82.0, 22.5937],
};

const COLOR_RANGE_ANGER = [
  "#f39281",
  "#f17e6a",
  "#ef6952",
  "#ed553b",
  "#eb4124",
  "#e2492d",
  "#be3d26",
];

const COLOR_RANGE_HAPPINESS = [
  "#fae8a4",
  "#f9e18c",
  "#f7db74",
  "#f6d55c",
  "#f5cf44",
  "#f3c92c",
  "#f2c214",
];

const COLOR_RANGE_NEUTRAL = [
  "#6bccc2",
  "#58c5bb",
  "#45bfb3",
  "#3caea3",
  "#359b91",
  "#2f887f",
  "#28756e",
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

const COLOR_RANGE_WORRY = [
  "#338bd5",
  "#297ec5",
  "#2471b0",
  "#20639b",
  "#1c5686",
  "#174871",
  "#133b5c",
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
    fill: "#9771d9",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

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

const Map = ({ changeLoadingStatus }) => {
  let history = useHistory();

  const [tooltipContent, setTooltipContent] = React.useState("");
  const [data, setData] = React.useState(getHeatMapData());
  const [attribute, setAttribute] = React.useState("anger");
  const [colorRange, setColorRange] = React.useState(COLOR_RANGE_ANGER);

  React.useEffect(() => {
    const fetch = createApolloFetch({
      uri: `/graphql`,
    });

    fetch({
      query: `{
        sentimentsState {
        id
        state
        anger
        happiness
        neutral
        sadness
        worry
        }
       }`,
    }).then((res) => {
      console.log(res.data);
      setData(res.data.sentimentsState);
      changeLoadingStatus(true);
    });
  }, [changeLoadingStatus]);

  const handleChange = (event) => {
    setAttribute(event.target.value);
    if (event.target.value === "anger") {
      setColorRange(COLOR_RANGE_ANGER);
    } else if (event.target.value === "happiness") {
      setColorRange(COLOR_RANGE_HAPPINESS);
    } else if (event.target.value === "neutral") {
      setColorRange(COLOR_RANGE_NEUTRAL);
    } else if (event.target.value === "sadness") {
      setColorRange(COLOR_RANGE_SADNESS);
    } else if (event.target.value === "worry") {
      setColorRange(COLOR_RANGE_WORRY);
    }
  };

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d[attribute]))
    .range(colorRange);

  const onMouseEnter = React.useCallback(
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

  const onMouseLeave = React.useCallback(() => {
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
              // try {
              //   console.log(
              //     "lol",
              //     data[0].state.toLowerCase(),
              //     geo.properties.name.toLowerCase()
              //   );
              // } catch {
              //   console.log("xD");
              // }

              try {
                const current = data.find(
                  (s) =>
                    s.state.toLowerCase() === geo.properties.name.toLowerCase()
                );
                // console.log(current, attribute);
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
              } catch {}
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
          <MenuItem value={"happiness"}>Happiness</MenuItem>
          <MenuItem value={"neutral"}>Neutral</MenuItem>
          <MenuItem value={"sadness"}>Sadness</MenuItem>
          <MenuItem value={"worry"}>Worry</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Map;
