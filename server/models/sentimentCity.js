const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sentimentCitySchema = new Schema(
  {
    state: String,
    city: String,
    sadness: Number,
    joy: Number,
    fear: Number,
    disgust: Number,
    anger: Number,
  },
  { collection: "sentiments_city" }
);

module.exports = mongoose.model("SentimentCity", sentimentCitySchema);
