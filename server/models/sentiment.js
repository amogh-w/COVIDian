const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sentimentSchema = new Schema(
  {
    date_time: Date,
    tweet: String,
    link: String,
    state: String,
    city: String,
    anger: Number,
    happiness: Number,
    neutral: Number,
    sadness: Number,
    worry: Number,
  },
  { collection: "sentiments" }
);

module.exports = mongoose.model("Sentiment", sentimentSchema);
