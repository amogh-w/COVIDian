require("dotenv").config();

const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const schema = require("./schema/schema");

app.use(cors());

app.get("/data/:entity", (req, res) => {
  const entity = req.params.entity;
  const data = require(`./data/${entity}.json`);
  res.json(data);
});

app.listen(5000, () => {
  console.log("Running at 5000");
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});
