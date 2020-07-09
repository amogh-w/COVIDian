const graphql = require("graphql");
const Sentiment = require("../models/sentiment");
const SentimentState = require("../models/sentimentState");
const SentimentCity = require("../models/sentimentCity");
const GraphQLDateTime = require("graphql-type-datetime");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
} = graphql;

const SentimentType = new GraphQLObjectType({
  name: "Sentiment",
  fields: () => ({
    id: { type: GraphQLID },
    date_time: { type: GraphQLDateTime },
    tweet: { type: GraphQLString },
    link: { type: GraphQLString },
    state: { type: GraphQLString },
    city: { type: GraphQLString },
    sadness: { type: GraphQLFloat },
    joy: { type: GraphQLFloat },
    fear: { type: GraphQLFloat },
    disgust: { type: GraphQLFloat },
    anger: { type: GraphQLFloat },
  }),
});

const SentimentStateType = new GraphQLObjectType({
  name: "SentimentState",
  fields: () => ({
    id: { type: GraphQLID },
    key: { type: GraphQLString },
    state: { type: GraphQLString },
    sadness: { type: GraphQLFloat },
    joy: { type: GraphQLFloat },
    fear: { type: GraphQLFloat },
    disgust: { type: GraphQLFloat },
    anger: { type: GraphQLFloat },
  }),
});

const SentimentCityType = new GraphQLObjectType({
  name: "SentimentCity",
  fields: () => ({
    id: { type: GraphQLID },
    state: { type: GraphQLString },
    city: { type: GraphQLString },
    sadness: { type: GraphQLFloat },
    joy: { type: GraphQLFloat },
    fear: { type: GraphQLFloat },
    disgust: { type: GraphQLFloat },
    anger: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    sentiment: {
      type: SentimentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Sentiment.findById(args.id);
      },
    },
    sentiments: {
      type: GraphQLList(SentimentType),
      args: { state: { type: GraphQLString }, city: { type: GraphQLString } },
      resolve(parent, args) {
        if (Object.keys(args).length === 0 && args.constructor === Object) {
          return Sentiment.find({});
        } else if ("state" in args) {
          return Sentiment.find({ state: args.state });
        } else if ("city" in args) {
          return Sentiment.find({ city: args.city });
        }
      },
    },
    sentimentsState: {
      type: GraphQLList(SentimentStateType),
      args: { state: { type: GraphQLString }, city: { type: GraphQLString } },
      resolve(parent, args) {
        if (Object.keys(args).length === 0 && args.constructor === Object) {
          return SentimentState.find({});
        } else if ("state" in args) {
          return SentimentState.find({ state: args.state });
        } else if ("city" in args) {
          return SentimentState.find({ city: args.city });
        }
      },
    },
    sentimentsCity: {
      type: GraphQLList(SentimentCityType),
      args: { state: { type: GraphQLString }, city: { type: GraphQLString } },
      resolve(parent, args) {
        if (Object.keys(args).length === 0 && args.constructor === Object) {
          return SentimentCity.find({});
        } else if ("state" in args) {
          return SentimentCity.find({ state: args.state });
        } else if ("city" in args) {
          return SentimentCity.find({ city: args.city });
        }
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
