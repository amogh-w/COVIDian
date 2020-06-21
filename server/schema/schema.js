const graphql = require("graphql");
const Sentiment = require("../models/sentiment");

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
    state: { type: GraphQLString },
    city: { type: GraphQLString },
    anger: { type: GraphQLFloat },
    disgust: { type: GraphQLFloat },
    fear: { type: GraphQLFloat },
    joy: { type: GraphQLFloat },
    sadness: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    sentiments: {
      type: GraphQLList(SentimentType),
      resolve(parent, args) {
        return Sentiment.find({});
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
