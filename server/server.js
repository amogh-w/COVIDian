require("dotenv").config();

const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const chatBot = require('./chatbot')
const schema = require("./schema/schema");
const { createApolloFetch } = require('apollo-fetch')
const Nfetch = require('node-fetch');

app.use(cors());
app.use(express.json())

const fetch = createApolloFetch({
  uri: `http://localhost:4000/graphql`,
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

app.post('/chat', async (req, res) => {
  // console.log(req.body.msg)
  const result = await chatBot(req.body.msg)
  // console.log(result)
  if (result.intent.displayName !== 'state_cases') return res.send({ query: result.fulfillmentText })

  const statesArr = result.parameters.fields.state.listValue.values
  const need = result.parameters.fields.need.listValue.values
  // console.log(need)
  // const casesData = []
  let query = ""
  if (need[0].stringValue === 'cases') {
    const [, countryData] = await Nfetch('https://covid-19india-api.herokuapp.com/all').then(data => data.json())
    statesArr.forEach(data => {
      const requiredData = countryData.state_data.find(stateData => stateData.state.toLowerCase() === data.stringValue.toLowerCase())
      // console.log(requiredData)
      if (requiredData) query += `${requiredData.state} stats -\n${requiredData.active} active cases\n${requiredData.confirmed} confirmed cases\n${requiredData.deaths} deaths\n${requiredData.recovered} recovery cases.`
      else query += `${data.stringValue} data is not available`
    })
    // const requiredData = countryData.state_data.find(stateData=>stateData.state.toLowerCase()===state.toLowerCase())
    return res.send({ query })
  }
  if(need[0].stringValue==='sentiments'){
  await asyncForEach(statesArr,async(data)=>{
    const emotionData = await fetch({
      query: `{
        sentimentsState(state: "${data.stringValue}") {
          anger
          happiness
          neutral
          sadness
          worry
        }
      }`,
    })
    query+=`${data.stringValue} stats -\n`
    const keys = Object.keys(emotionData.data.sentimentsState[0])
    const values = Object.values(emotionData.data.sentimentsState[0])
    keys.forEach((emo,index)=>{
      query+=`${(values[index]*100).toFixed(2)}% of people feel ${emo}\n`
    })
  })
  return res.send({query})
  }

  let emotionsQuery = ""
  await asyncForEach(statesArr, async (data) => {
    // asyncForEach(need, async (item) => {
    //   emotionsQuery += `${item.stringValue.toLowerCase()}`
    // })
    need.forEach((item) => {
        emotionsQuery += `${item.stringValue.toLowerCase()} `
      })

    const emotionData = await fetch({
      query: `{
        sentimentsState(state: "${data.stringValue}") {
          ${emotionsQuery}
        }
      }`,
    })
    query+=`${data.stringValue} stats -\n`
    const keys = Object.keys(emotionData.data.sentimentsState[0])
    const values = Object.values(emotionData.data.sentimentsState[0])
    keys.forEach((emo,index)=>{
      query+=`${(values[index]*100).toFixed(2)}% of people feel ${emo}\n`
    })
  })
  res.send({query})
  // let query = ""
  // if (need==='emotion')

  // const emotionData = await fetch({
  //   query: `{
  //     sentiments(state: "${state}") {
  //     id
  //     date_time
  //     tweet
  //     link
  //     state
  //     city
  //     anger
  //     happiness
  //     neutral
  //     sadness
  //     worry
  //     }
  //   }`,
  // }).then(data=>console.log())
})

app.listen(process.env.covidian_server_internal_port || 4000, () => {
  console.log(
    `Running at ${process.env.covidian_server_internal_port || 4000}`
  );
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

mongoose.connect(`${process.env.mongo_url}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});
