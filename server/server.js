require("dotenv").config();

const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const schema = require("./schema/schema");

app.use(cors());


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

mongoose.connect(`${process.env.covidian_server_internal_mongo_url}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});
