const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sentimentStateSchema = new Schema(
  {
    state: String,
    anger: Number,
    happiness: Number,
    neutral: Number,
    sadness: Number,
    worry: Number,
  },
  { collection: "sentiments_state" }
);

module.exports = mongoose.model("SentimentState", sentimentStateSchema);
