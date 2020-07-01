const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sentimentStateSchema = new Schema(
  {
    key: String,
    state: String,
    sadness: Number,
    joy: Number,
    fear: Number,
    disgust: Number,
    anger: Number,
  },
  { collection: "sentiments_state" }
);

module.exports = mongoose.model("SentimentState", sentimentStateSchema);
