const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sentimentSchema = new Schema({
  date_time: Date,
  tweet: String,
  link: String,
  state: String,
  city: String,
  sadness: Number,
  joy: Number,
  fear: Number,
  disgust: Number,
  anger: Number,
});

module.exports = mongoose.model("Sentiment", sentimentSchema);
