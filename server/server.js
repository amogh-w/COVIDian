require("dotenv").config();

const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const chatBot = require("./chatbot");
const schema = require("./schema/schema");
const { createApolloFetch } = require("apollo-fetch");
const Nfetch = require("node-fetch");

app.use(cors());
app.use(express.json());

const fetch = createApolloFetch({
  uri: `http://localhost:4000/graphql`,
});

app.post("/chat", async (req, res) => {
  // console.log(req.body.msg)
  const result = await chatBot(req.body.msg);
  // console.log(result)
  if (result.intent.displayName === "Default Fallback Intent")
    return res.send({ msg: "Invalid query" });

  const statesArr = result.parameters.fields.state.listValue.values;
  const need = result.parameters.fields.need.listValue.values;
  const casesData = [];
  if (need[0].stringValue === "cases") {
    const [, countryData] = await Nfetch(
      "https://covid-19india-api.herokuapp.com/all"
    ).then((data) => data.json());
    statesArr.forEach((data) => {
      const requiredData = countryData.state_data.find(
        (stateData) =>
          stateData.state.toLowerCase() === data.stringValue.toLowerCase()
      );
      if (requiredData)
        casesData.push({ name: data.stringValue, ...requiredData });
      else casesData.push({ name: data.stringValue });
    });
    // const requiredData = countryData.state_data.find(stateData=>stateData.state.toLowerCase()===state.toLowerCase())
    return res.send({ data: casesData });
  }

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
  res.end();
});

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
