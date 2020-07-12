const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sentimentCitySchema = new Schema(
  {
    state: String,
    city: String,
    anger: Number,
    happiness: Number,
    neutral: Number,
    sadness: Number,
    worry: Number,
  },
  { collection: "sentiments_city" }
);

module.exports = mongoose.model("SentimentCity", sentimentCitySchema);
