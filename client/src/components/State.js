import React from "react";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { createApolloFetch } from "apollo-fetch";
import { scaleQuantile } from "d3-scale";
import makeStyles from "@material-ui/core/styles/makeStyles";

import andamannicobar from "../topojsons/states/andamannicobar.json";
import andhrapradesh from "../topojsons/states/andhrapradesh.json";
import arunachalpradesh from "../topojsons/states/arunachalpradesh.json";
import assam from "../topojsons/states/assam.json";
import bihar from "../topojsons/states/bihar.json";
import chhattisgarh from "../topojsons/states/chhattisgarh.json";
import delhi from "../topojsons/states/delhi.json";
import goa from "../topojsons/states/goa.json";
import gujarat from "../topojsons/states/gujarat.json";
import haryana from "../topojsons/states/haryana.json";
import himachalpradesh from "../topojsons/states/himachalpradesh.json";
import jammukashmir from "../topojsons/states/jammukashmir.json";
import jharkhand from "../topojsons/states/jharkhand.json";
import karnataka from "../topojsons/states/karnataka.json";
import kerala from "../topojsons/states/kerala.json";
import lakshadweep from "../topojsons/states/lakshadweep.json";
import madhyapradesh from "../topojsons/states/madhyapradesh.json";
import maharashtra from "../topojsons/states/maharashtra.json";
import manipur from "../topojsons/states/manipur.json";
import meghalaya from "../topojsons/states/meghalaya.json";
import mizoram from "../topojsons/states/mizoram.json";
import nagaland from "../topojsons/states/nagaland.json";
import odisha from "../topojsons/states/odisha.json";
import punjab from "../topojsons/states/punjab.json";
import rajasthan from "../topojsons/states/rajasthan.json";
import sikkim from "../topojsons/states/sikkim.json";
import tamilnadu from "../topojsons/states/tamilnadu.json";
import telangana from "../topojsons/states/telangana.json";
import tripura from "../topojsons/states/tripura.json";
import uttarakhand from "../topojsons/states/uttarakhand.json";
import uttarpradesh from "../topojsons/states/uttarpradesh.json";
import westbengal from "../topojsons/states/westbengal.json";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

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
  return [];
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

const State = ({ selectedState }) => {
  let geoURL;
  let centerMap = [80, 22];
  let scaleMap = 400;
  if (selectedState === "Andaman & Nicobar Island") {
    geoURL = andamannicobar;
    scaleMap = 2000;
    centerMap = [93, 10];
  } else if (selectedState === "Andhra Pradesh") {
    geoURL = andhrapradesh;
    scaleMap = 2000;
    centerMap = [80, 16.5];
  } else if (selectedState === "Arunachal Pradesh") {
    geoURL = arunachalpradesh;
    scaleMap = 1200;
    centerMap = [94.5, 28];
  } else if (selectedState === "Assam") {
    geoURL = assam;
    scaleMap = 2500;
    centerMap = [92.9, 25.8];
  } else if (selectedState === "Bihar") {
    geoURL = bihar;
    scaleMap = 2500;
    centerMap = [85.5, 25.5];
  } else if (selectedState === "Chhattisgarh") {
    geoURL = chhattisgarh;
    scaleMap = 2000;
    centerMap = [82, 21];
  } else if (selectedState === "NCT of Delhi") {
    geoURL = delhi;
    scaleMap = 20000;
    centerMap = [77.1, 28.6];
  } else if (selectedState === "Goa") {
    geoURL = goa;
    scaleMap = 15000;
    centerMap = [74, 15.3];
  } else if (selectedState === "Gujarat") {
    geoURL = gujarat;
    scaleMap = 2500;
    centerMap = [71.5, 22.3];
  } else if (selectedState === "Haryana") {
    geoURL = haryana;
    scaleMap = 4000;
    centerMap = [76.2, 29.2];
  } else if (selectedState === "Himachal Pradesh") {
    geoURL = himachalpradesh;
    scaleMap = 4000;
    centerMap = [77.4, 31.8];
  } else if (selectedState === "Jammu & Kashmir") {
    geoURL = jammukashmir;
    scaleMap = 2000;
    centerMap = [76.3, 34.5];
  } else if (selectedState === "Jharkhand") {
    geoURL = jharkhand;
    scaleMap = 1700;
    centerMap = [85.7, 23.6];
  } else if (selectedState === "Karnataka") {
    geoURL = karnataka;
    scaleMap = 2000;
    centerMap = [76.5, 15];
  } else if (selectedState === "Kerala") {
    geoURL = kerala;
    scaleMap = 3000;
    centerMap = [76, 10.5];
  } else if (selectedState === "Lakshadweep") {
    geoURL = lakshadweep;
    scaleMap = 2500;
    centerMap = [73, 10.5];
  } else if (selectedState === "Madhya Pradesh") {
    geoURL = madhyapradesh;
    scaleMap = 2000;
    centerMap = [78.5, 23.5];
  } else if (selectedState === "Maharashtra") {
    geoURL = maharashtra;
    scaleMap = 2000;
    centerMap = [76.8, 18.5];
  } else if (selectedState === "Manipur") {
    geoURL = manipur;
    scaleMap = 5000;
    centerMap = [93.8, 24.7];
  } else if (selectedState === "Meghalaya") {
    geoURL = meghalaya;
    scaleMap = 5000;
    centerMap = [91.3, 25.4];
  } else if (selectedState === "Mizoram") {
    geoURL = mizoram;
    scaleMap = 4000;
    centerMap = [92.8, 23.25];
  } else if (selectedState === "Nagaland") {
    geoURL = nagaland;
    scaleMap = 5000;
    centerMap = [94.3, 26.1];
  } else if (selectedState === "Odisha") {
    geoURL = odisha;
    scaleMap = 2700;
    centerMap = [84.4, 20.25];
  } else if (selectedState === "Punjab") {
    geoURL = punjab;
    scaleMap = 3500;
    centerMap = [75.35, 31];
  } else if (selectedState === "Rajasthan") {
    geoURL = rajasthan;
    scaleMap = 1800;
    centerMap = [74, 26.3];
  } else if (selectedState === "Sikkim") {
    geoURL = sikkim;
    scaleMap = 8000;
    centerMap = [88.45, 27.6];
  } else if (selectedState === "Tamil Nadu") {
    geoURL = tamilnadu;
    scaleMap = 2000;
    centerMap = [78.25, 10.8];
  } else if (selectedState === "Telangana") {
    geoURL = telangana;
    scaleMap = 3000;
    centerMap = [79.5, 17.9];
  } else if (selectedState === "Tripura") {
    geoURL = tripura;
    scaleMap = 6500;
    centerMap = [91.75, 23.75];
  } else if (selectedState === "Uttarakhand") {
    geoURL = uttarakhand;
    scaleMap = 2000;
    centerMap = [79.3, 30];
  } else if (selectedState === "Uttar Pradesh") {
    geoURL = uttarpradesh;
    scaleMap = 2000;
    centerMap = [80.8, 27];
  } else if (selectedState === "West Bengal") {
    geoURL = westbengal;
    scaleMap = 2000;
    centerMap = [87.7, 24.2];
  }

  const PROJECTION_CONFIG = {
    scale: scaleMap,
    center: centerMap,
  };

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
        sentimentsCity {
        id
        state
        city
        anger
        happiness
        neutral
        sadness
        worry
        }
       }`,
    }).then((res) => {
      // console.log(res.data.sentimentsState, attribute);
      setData(res.data.sentimentsCity);
    });
  }, []);

  const handleChange = (event) => {
    setAttribute(event.target.value);
    console.log("HEY", event.target.value);
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
      if (geo.properties.district && current) {
        console.log(geo.properties.district, current.city);
      }
      return () => {
        setTooltipContent(
          `${geo.properties.district}: ${
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
      <Typography align="center" variant="h4">
        {selectedState}
      </Typography>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={500}
        height={300}
        data-tip=""
      >
        <Geographies geography={geoURL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = data.find(
                (s) =>
                  s.city.toLowerCase() === geo.properties.district.toLowerCase()
              );

              console.log(current, attribute);
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
          <MenuItem value={"happiness"}>Happiness</MenuItem>
          <MenuItem value={"neutral"}>Neutral</MenuItem>
          <MenuItem value={"sadness"}>Sadness</MenuItem>
          <MenuItem value={"worry"}>Worry</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default State;
