const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sentimentSchema = new Schema({
  state: String,
  city: String,
  link: String,
  anger: Number,
  disgust: Number,
  fear: Number,
  joy: Number,
  sadness: Number,
});

module.exports = mongoose.model("Sentiment", sentimentSchema);
