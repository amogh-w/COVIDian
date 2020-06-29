import React,{useMemo,useCallback,useState} from 'react'
import { scaleQuantile } from "d3-scale";
import { 
  ComposableMap, Geographies, Geography 
} from 'react-simple-maps';

import ReactTooltip from 'react-tooltip';

const INDIA_TOPO_JSON = require('./india.topo.json');



function App() {

  const PROJECTION_CONFIG = useMemo(()=>(
    {
      scale: 350,
      center: [78.9629, 22.5937]
    }
  ),[])
  const [tooltipContent, setTooltipContent] = useState('');
  const getRandomInt = useCallback(()=>Math.random()*100,[])

  const data = useMemo(()=>(
    [
      { id: 'AP', state: 'Andhra Pradesh', angry: getRandomInt() },
      { id: 'AR', state: 'Arunachal Pradesh', angry: getRandomInt() },
      { id: 'AS', state: 'Assam', angry: getRandomInt() },
      { id: 'BR', state: 'Bihar', angry: getRandomInt() },
      { id: 'CT', state: 'Chhattisgarh', angry: getRandomInt() },
      { id: 'GA', state: 'Goa', angry: 21 },
      { id: 'GJ', state: 'Gujarat', angry: 22 },
      { id: 'HR', state: 'Haryana', angry: getRandomInt() },
      { id: 'HP', state: 'Himachal Pradesh', angry: 24 },
      { id: 'JH', state: 'Jharkhand', angry: 26 },
      { id: 'KA', state: 'Karnataka', angry: 27 },
      { id: 'KL', state: 'Kerala', angry: getRandomInt() },
      { id: 'MP', state: 'Madhya Pradesh', angry: getRandomInt() },
      { id: 'MH', state: 'Maharashtra', angry: getRandomInt() },
      { id: 'MN', state: 'Manipur', angry: getRandomInt() },
      { id: 'ML', state: 'Meghalaya', angry: 59 },
      { id: 'MZ', state: 'Mizoram', angry: getRandomInt() },
      { id: 'NL', state: 'Nagaland', angry: 59 },
      { id: 'OR', state: 'Odisha', angry: 59 },
      { id: 'PB', state: 'Punjab', angry: getRandomInt() },
      { id: 'RJ', state: 'Rajasthan', angry: getRandomInt() },
      { id: 'SK', state: 'Sikkim', angry: getRandomInt() },
      { id: 'TN', state: 'Tamil Nadu', angry: getRandomInt() },
      { id: 'TG', state: 'Telangana', angry: getRandomInt() },
      { id: 'TR', state: 'Tripura', angry: 14 },
      { id: 'UT', state: 'Uttarakhand', angry: getRandomInt() },
      { id: 'UP', state: 'Uttar Pradesh', angry: 15 },
      { id: 'WB', state: 'West Bengal', angry: 17 },
      { id: 'WB', state: 'West Bengal', angry: 17 },
      { id: 'AN', state: 'Andaman and Nicobar Islands', angry: getRandomInt() },
      { id: 'CH', state: 'Chandigarh', angry: getRandomInt() },
      { id: 'DN', state: 'Dadra and Nagar Haveli', angry: 19 },
      { id: 'DD', state: 'Daman and Diu', angry: 20 },
      { id: 'DL', state: 'Delhi', angry: 59 },
      { id: 'JK', state: 'Jammu and Kashmir', angry: 25 },
      { id: 'LA', state: 'Ladakh', angry: getRandomInt() },
      { id: 'LD', state: 'Lakshadweep', angry: getRandomInt() },
      { id: 'PY', state: 'Puducherry', angry: getRandomInt() }
    ]
  ),[getRandomInt])

  const onMouseEnter = useCallback((geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current["angry"]}`);
    };
  },[])

  const onMouseLeave = useCallback(() => {
    setTooltipContent('');
  },[])

  const colorScale = scaleQuantile()
    .domain(data.map(d => d["angry"]))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

    const geographyStyle = {
      default: {
        outline: 'none'
      },
      hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none'
      },
      pressed: {
        outline: 'none'
      }
    };

  return (
    <>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={600}
          height={220}
          data-tip=""
      >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current["angry"]) : "#000"}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
      </ComposableMap>
    </>
  )
}
export default App;
