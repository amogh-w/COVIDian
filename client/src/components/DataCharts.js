import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Radar } from "react-chartjs-2";
import useTheme from "@material-ui/core/styles/useTheme";
import { createApolloFetch } from "apollo-fetch";



const DataCharts = ({ type }) => {
  const [keyArr,setKeyArr] = React.useState([])
  const [valueArr,setValueArr] = React.useState([])
  const [datasets,setDataset] = React.useState([])

  const pieData = React.useMemo(()=>(
    {
      labels: keyArr,
      datasets: [
        {
          data: valueArr,
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
    }
  ),[valueArr,keyArr])

  const radarData = React.useMemo(()=>(
    {
      labels: keyArr,
      datasets
    }
  ),[keyArr,datasets])

  React.useEffect(()=>{
  const fetch = createApolloFetch({
    uri: `/graphql`,
  });
  (async ()=>{

    const countryDataArr = fetch({
      query: `{
            sentimentsCountry(country: "India") {
            id
            country
            anger
            happiness
            neutral
            sadness
            worry
            }
        }`,
    })
    const mumbaiData = fetch({
      query: `{
          sentimentsCity(city: "Mumbai") {
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
    })
    const delhiData = fetch({
      query: `{
          sentimentsCity(city: "Delhi") {
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
    })
    const hyderabadData = fetch({
      query: `{
          sentimentsCity(city: "Hyderabad") {
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
    })
    const chennaiData = fetch({
      query: `{
          sentimentsCity(city: "Chennai") {
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
    })
    const kolkataData = fetch({
      query: `{
          sentimentsCity(city: "Kolkata") {
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
    })
    const allData = await Promise.all([countryDataArr,mumbaiData,delhiData,kolkataData,hyderabadData,chennaiData])
    const data = allData.shift()
    let dataSetArr = []
    let colorObj = {
      mumbai:"rgba(179,181,198,",
      delhi:"rgba(255,99,132,",
      hyderabad:"rgba(50, 210, 61,",
      chennai:"rgba(5, 143, 255,",
      kolkata:"rgba(255, 5, 247,"
    }

    allData.forEach(cityData=>{
      let data = cityData.data.sentimentsCity[0]
      let city = data.city
      delete data['city']
      delete data['id']
      delete data['state']
      let primaryColor = colorObj[city.toLowerCase()] 
      let tempValueArr = Object.values(data)
      tempValueArr = tempValueArr.map(data=>parseInt((data*100).toFixed(4)))  
      let obj = {
        label:city,
        backgroundColor: primaryColor + "0.2)",
        borderColor: primaryColor + "1)",
        pointBackgroundColor: primaryColor + "1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: primaryColor + "1)",
        data:tempValueArr
      }
      dataSetArr.push(obj)
    })
    // console.log(dataSetArr)
    let countryData = data.data.sentimentsCountry[0]
    delete countryData['country']
    delete countryData['id']
    setKeyArr(Object.keys(countryData))
    let tempValueArr = Object.values(countryData)
    tempValueArr = tempValueArr.map(data=>parseInt((data*100).toFixed(4)))
    setValueArr(tempValueArr)
    setDataset(dataSetArr)
  })()
  },[])

  const theme = useTheme();
  const [themeType, setTheme] = React.useState(theme.palette.type);
  React.useEffect(() => {
    setTheme(theme.palette.type);
  }, [theme.palette.type]);
  if (type === "doughnut") {
    return (
      <div>
        <Doughnut
          data={pieData}
          options={{
            legend: {
              labels: {
                fontColor:
                  themeType === "dark" ? "rgb(255,255,255)" : "rgb(0,0,0)",
              },
            },
          }}
        />
      </div>
    );
  } else if (type === "radar") {
    return (
      <div>
        <Radar
          data={radarData}
          options={{
            legend: {
              labels: {
                fontColor:
                  themeType === "dark" ? "rgb(255,255,255)" : "rgb(0,0,0)",
              },
            },
          }}
        />
      </div>
    );
  }
};

export default React.memo(DataCharts);
