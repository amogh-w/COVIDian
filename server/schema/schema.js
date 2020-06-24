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
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
